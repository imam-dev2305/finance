<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSpReport extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Illuminate\Support\Facades\DB::unprepared('create procedure sp_report(in id varchar(255), start_date date, end_date date)
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
    declare tmp_grand_total_category double;
    declare tmp_total_category double;
    declare tmp_query text;
    declare cur1 cursor for
        select category_id, category_name, category_parent, category_color, category_icon, user_id from categories where (user_id = id OR isnull(user_id)) order by category_parent, category_name;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    open cur1;
    drop temporary table if exists report;
    create temporary table report (data json);
    insert into report(data) values(json_compact((select json_arrayagg(json_object(\'income\', json_compact(\'[]\'), \'expense\', json_compact(\'[]\'))))));
    read_loop: LOOP
        fetch cur1 into c_category_id, c_category_name, c_category_parent, c_category_color, c_category_icon, c_user_id;
        if done then
            leave read_loop;
        end if;
        set tmp_category_id = c_category_parent;
        if(isnull(c_category_parent) AND left(c_category_id, 1) = \'6\') then
            set tmp_grand_total_category = (select ifnull(sum(convert_amount),0) as grand_total from transactionuser where ((left(category_id, 1) = left(c_category_id,1) AND length(category_id) = 4) or left(category_parent, 1) = left(c_category_id, 1)) AND user_id = id AND left(transaction_date,10) between start_date AND end_date);
            set tmp_total_category = (select ifnull(sum(convert_amount),0) as grand_total from transactionuser where category_id = c_category_id AND user_id = id AND left(transaction_date,10) between start_date AND end_date);
            set @tmp_query = (select json_arrayagg(json_object(\'category_id\', left(c_category_id, 1), \'category_name\', c_category_name, \'category_parent\', c_category_parent, \'category_icon\', c_category_icon, \'category_color\', c_category_color, \'total\', tmp_grand_total_category, \'user_id\', c_user_id, \'child\', json_compact((select json_arrayagg(json_object(\'category_id\', c_category_id, \'category_name\', concat(\'General | \', c_category_name), \'category_parent\', c_category_parent, \'category_icon\', c_category_icon, \'category_color\', c_category_color, \'total\', tmp_total_category, \'user_id\', c_user_id)))))));
            update report set data = json_set(data, \'$[0].income\', json_merge((select json_query(data, \'$[0].income\') from report), json_compact(@tmp_query)));
        elseif(isnull(c_category_parent) AND left(c_category_id, 1) != \'6\') then
            set tmp_grand_total_category = (select ifnull(sum(convert_amount),0) as grand_total from transactionuser where ((left(category_id, 1) = left(c_category_id,1) AND length(category_id) = 4) or left(category_parent, 1) = left(c_category_id,1)) AND user_id = id AND left(transaction_date,10) between start_date AND end_date);
            set tmp_total_category = (select ifnull(sum(convert_amount), 0) as grand_total from transactionuser where category_id = c_category_id AND user_id = id AND left(transaction_date,10) between start_date AND end_date);
            set @tmp_query = (select json_arrayagg(json_object(\'category_id\', left(c_category_id, 1), \'category_name\', c_category_name, \'category_parent\', c_category_parent, \'category_icon\', c_category_icon, \'category_color\', c_category_color, \'total\', tmp_grand_total_category, \'user_id\', c_user_id, \'child\', json_compact((select json_arrayagg(json_object(\'category_id\', c_category_id, \'category_name\', concat(\'General | \', c_category_name), \'category_parent\', c_category_parent, \'category_icon\', c_category_icon, \'category_color\', c_category_color, \'total\', tmp_total_category, \'user_id\', c_user_id)))))));
            update report set data = json_set(data, \'$[0].expense\', json_merge((select json_query(data, \'$[0].expense\') from report), json_compact(@tmp_query)));
        else
            set tmp_total_category = (select ifnull(sum(convert_amount), 0) as grand_total from transactionuser where category_id = c_category_id AND user_id = id AND left(transaction_date,10) between start_date AND end_date);
            set @tmp_search = (select json_search(data, \'one\', left(tmp_category_id, 1)) from report);
            set @dir = (select replace(@tmp_search, \'.category_id\', \'.child\'));
            set @tmp_query = (select json_arrayagg(json_object(\'category_id\', c_category_id, \'category_name\', c_category_name, \'category_parent\', c_category_parent, \'category_icon\', c_category_icon, \'category_color\', c_category_color, \'total\', tmp_total_category, \'user_id\', c_user_id)));
            update report set data = json_set(data, (select replace(@dir, \'"\', \'\')), json_merge((select json_query(data, (select replace(@dir, \'"\', \'\'))) from report), json_compact(@tmp_query)));
        end if;
    end loop;
    select * from report;
    drop temporary table if exists report;
end;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('DROP PROCEDURE IF EXISTS sp_report');
    }
}
