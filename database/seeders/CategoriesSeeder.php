<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
           'category_id' => 1,
           'category_name' => 'Income',
           'category_icon' => 'fa fa-cash',
           'category_color' => 'ffffff'
        ]);
    }
}
