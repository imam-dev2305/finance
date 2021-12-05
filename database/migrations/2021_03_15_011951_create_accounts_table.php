<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->string('account_id')->primary();
            $table->string('account_name', 25);
            $table->string('bank_account_number', 25)->nullable(true);
            $table->integer('account_type_id');
            $table->double('amount', 12, 2)->default(0);
            $table->char('currency_id', 3);
            $table->string('color', 50);
            $table->boolean('exclude_from_stat')->default(0);
            $table->string('user_id')->index();
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
        Schema::dropIfExists('accounts');
    }
}
