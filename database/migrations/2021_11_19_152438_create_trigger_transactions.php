<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateTriggerTransactions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('create trigger delete_saldo
    after delete
    on transactions
    for each row
begin
        update accounts set amount = amount - old.amount where account_id = old.account_id;
    end;');

        DB::unprepared('create trigger insert_saldo
    after insert
    on transactions
    for each row
begin
        update accounts set amount = amount + new.amount where account_id = new.account_id;
    end;');

        DB::unprepared('create trigger update_saldo
    after update
    on transactions
    for each row
begin
        if (old.account_id != new.account_id) then
            update accounts set amount = amount - old.amount where account_id = old.account_id;
            update accounts set amount = amount + new.amount where account_id = new.account_id;
        else
            update accounts set amount = amount - old.amount where account_id = new.account_id;
            update accounts set amount = amount + new.amount where account_id = new.account_id;
        end if;
    end;
');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER delete_saldo');
        DB::unprepared('DROP TRIGGER insert_saldo');
        DB::unprepared('DROP TRIGGER update_saldo');
    }
}
