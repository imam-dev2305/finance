<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateSpCategories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('create
    definer = root@localhost procedure sp_categories(IN id varchar(255))
begin
    DECLARE done INT DEFAULT FALSE;
    declare cur1_id int;
    declare c_category_id varchar(255);
    declare c_category_parent varchar(255);
    declare c_category_name varchar(255);
    declare c_category_icon varchar(255);
    declare c_category_color varchar(255);
    declare c_user_id varchar(255);
    declare tmp_category_id varchar(255);
    declare tmp_query text;
    declare cur1 cursor for
        select * from (
                          select category_id, category_name, category_parent, category_color, category_icon, \'\' as \'user_id\' from categories
                          union
                          select category_id, category_name, category_parent, category_color, category_icon, user_id from categories_user where user_id = id
                      ) AS t order by category_parent, category_name;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    open cur1;
    drop temporary table if exists tmp;
    create temporary table tmp (data json);
    read_loop: LOOP
        fetch cur1 into c_category_id, c_category_name, c_category_parent, c_category_color, c_category_icon, c_user_id;
        if done then
            leave read_loop;
        end if;
        set @tmp_id = (select json_value(data, \'$[0].category_id\') from tmp);
        if (isnull(@tmp_id)) then
            set @tmp_query = (select json_arrayagg(json_object(\'category_id\', c_category_id, \'category_name\', c_category_name, \'category_parent\', c_category_parent, \'category_icon\', c_category_icon, \'category_color\', c_category_color, \'user_id\', c_user_id, \'child\', json_compact(\'[]\'))));
            INSERT INTO tmp(data) values(json_compact(@tmp_query));
        else
            set tmp_category_id = c_category_parent;
            if (isnull(tmp_category_id)) then
                set @tmp_query = (select json_object(\'category_id\', c_category_id, \'category_name\', c_category_name, \'category_parent\', c_category_parent, \'category_icon\', c_category_icon, \'category_color\', c_category_color, \'user_id\', c_user_id, \'child\', json_compact(\'[]\')));
                update tmp set data = json_array_append(data, \'$\', json_compact(@tmp_query));
            else
                set @tmp_search = (select json_search(data, \'one\', tmp_category_id) from tmp);
                set @dir = (select replace(@tmp_search, \'.category_id\', \'.child\'));
                set @tmp_query = (select json_arrayagg(json_object(\'category_id\', c_category_id, \'category_name\', c_category_name, \'category_parent\', c_category_parent, \'category_icon\', c_category_icon, \'category_color\', c_category_color, \'user_id\', c_user_id, \'child\', json_compact(\'[]\'))));
                update tmp set data = json_set(data, (select replace(@dir, \'"\', \'\')), json_merge((select json_query(data, (select replace(@dir, \'"\', \'\'))) from tmp), json_compact(@tmp_query)));
            end if;
        end if;
    end loop;
    select * from tmp;
    drop temporary table if exists tmp;
end;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS sp_categories');
    }
}
