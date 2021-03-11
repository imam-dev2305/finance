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
            $table->string('transaction_id', '15')->primary();
            $table->char('sub_journal_account_id', 5);
            $table->string('ref', '25')->nullable();
            $table->text('keterangan')->nullable();
            $table->integer('debet')->default('0');
            $table->integer('kredit')->default('0');
            $table->bigInteger('user_id');
            $table->date('tgl_transaksi');
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
