<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id('transaction_id');
            $table->bigInteger('transaction_type_id');
            $table->bigInteger('account_id');
            $table->char('category_id', 5);
            $table->integer('amount');
            $table->char('currency_id', 3);
            $table->dateTime('transaction_date');
            $table->string('transaction_note', 100)->nullable(true);
            $table->string('transaction_payee', 100)->nullable(true);
            $table->enum('status', ['0','1','2'])->comment('0 = Reconciled / Rekonsiliasi, 1 = Cleared / Lunas, 2 = Uncleared / Belum lunas');
            $table->integer('user_id');
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
        Schema::dropIfExists('transactions');
    }
}
