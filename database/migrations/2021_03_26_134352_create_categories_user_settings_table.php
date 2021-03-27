<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesUserSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories_user_settings', function (Blueprint $table) {
            $table->string('category_setting_id')->primary();
            $table->char('category_id', 4);
            $table->string('category_name', 50);
            $table->string('category_icon', 50);
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
        Schema::dropIfExists('categories_user_settings');
    }
}
