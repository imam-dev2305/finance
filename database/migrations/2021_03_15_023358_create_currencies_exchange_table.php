<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCurrenciesExchangeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('currencies_exchange', function (Blueprint $table) {
            $table->string('currency_exchange_id')->primary();
            $table->string('currency_exchange_name');
            $table->string('currency_exchange_convert_to');
            $table->double('currency_exchange_value', 12, 2);
            $table->boolean('currency_exchange_deleteable')->default(true);
            $table->string('user_id');
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
        Schema::dropIfExists('currencies_exchange');
    }
}
