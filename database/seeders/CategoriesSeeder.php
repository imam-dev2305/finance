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
        DB::table('categories')->insert(
            [
                'category_id' => '1',
                'category_parent' => '',
                'category_name' => 'Income',
                'category_icon' => 'fa fa-cash',
                'category_color' => 'ffffff'
            ],
            [
                'category_id' => '1.1',
                'category_parent' => '1',
                'category_name' => 'Ovo',
                'category_icon' => 'fa fa-cash',
                'category_color' => 'ffffff'
            ]
        );
    }
}
