<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubJournalAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sub_journal_accounts', function (Blueprint $table) {
            $table->id();
            $table->char('sub_journal_account_id', 5);
            $table->char('journal_account_id', 1);
            $table->string('sub_journal_account_name', 50);
            $table->bigInteger('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sub_journal_accounts');
    }
}
