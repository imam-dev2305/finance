<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesSubsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories_subs')->insert([
           'category_sub_name' => 'Freelance',
           'category_id' => '1',
           'category_icon' => 'fa fa-cash',
           'category_color' => 'ffffff'
        ]);
    }
}
