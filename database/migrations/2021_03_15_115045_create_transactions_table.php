<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::enableForeignKeyConstraints();
        Schema::create('transactions', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->string('transaction_id')->primary();
            $table->bigInteger('transaction_type_id');
            $table->string('account_id');
            $table->string('category_id')->nullable();
            $table->double('amount', 12, 2);
            $table->string('destination_account_id')->nullable();
            $table->dateTime('transaction_date');
            $table->string('transaction_note', 100)->nullable(true);
            $table->string('transaction_payee', 100)->nullable(true);
            $table->enum('status', ['0', '1', '2'])->comment('0 = Reconciled / Rekonsiliasi, 1 = Cleared / Lunas, 2 = Uncleared / Belum lunas');
            $table->string('user_id');
            $table->timestamps();
        });
        Schema::table('transactions', function (Blueprint $table) {
            $table->foreign('account_id')->references('account_id')->on('accounts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropForeign(['account_id']);
            $table->dropIfExists('transactions');
        });
    }
}
