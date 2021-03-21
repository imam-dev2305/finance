<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesSubsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories_subs', function (Blueprint $table) {
            $table->char('category_sub_id', 4)->primary();
            $table->string('category_sub_name', 25);
            $table->char('category_id', 2);
            $table->string('category_icon', 25);
            $table->string('category_color', 10);
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
        Schema::dropIfExists('categories_subs');
    }
}
