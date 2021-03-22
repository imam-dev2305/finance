<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesSubCustomTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories_subs_customs', function (Blueprint $table) {
            $table->char('category_sub_custom_id', 4)->primary();
            $table->string('category_sub_custom_name', 25);
            $table->char('category_id', 4);
            $table->string('category_icon', 25);
            $table->string('category_color', 10);
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
        Schema::dropIfExists('categories_sub_custom');
    }
}
