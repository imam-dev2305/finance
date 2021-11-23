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
        DB::table('categories')->truncate();
        DB::table('categories')->insert(
            [
                [
                    'category_id' => '1000',
                    'category_parent' => null,
                    'category_name' => 'Food & Drinks',
                    'category_icon' => 'mdi-silverware-fork-knife',
                    'category_color' => 'bg-gradient-red',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '1100',
                    'category_parent' => '1000',
                    'category_name' => 'Side Dish',
                    'category_icon' => 'mdi-cupcake',
                    'category_color' => 'bg-gradient-red',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '1200',
                    'category_parent' => '1000',
                    'category_name' => 'Main Dish',
                    'category_icon' => 'mdi-food-variant',
                    'category_color' => 'bg-gradient-red',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '2000',
                    'category_parent' => null,
                    'category_name' => 'Shopping',
                    'category_icon' => 'mdi-basket',
                    'category_color' => 'bg-gradient-light-blue',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '2100',
                    'category_parent' => '2000',
                    'category_name' => 'Cloth',
                    'category_icon' => 'mdi-tshirt-crew',
                    'category_color' => 'bg-gradient-light-blue',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '2200',
                    'category_parent' => '2000',
                    'category_name' => 'Perfume',
                    'category_icon' => 'mdi-bottle-tonic',
                    'category_color' => 'bg-gradient-light-blue',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '3000',
                    'category_parent' => null,
                    'category_name' => 'Housing',
                    'category_icon' => 'mdi-home-city',
                    'category_color' => 'bg-gradient-green',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '3100',
                    'category_parent' => '3000',
                    'category_name' => 'Rent',
                    'category_icon' => 'mdi-home',
                    'category_color' => 'bg-gradient-green',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '3200',
                    'category_parent' => '3000',
                    'category_name' => 'Repair',
                    'category_icon' => 'mdi-hammer-screwdriver',
                    'category_color' => 'bg-gradient-green',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '4000',
                    'category_parent' => null,
                    'category_name' => 'Transportation',
                    'category_icon' => 'mdi-train-car',
                    'category_color' => 'bg-gradient-orange',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '4100',
                    'category_parent' => '4000',
                    'category_name' => 'Public Transportation',
                    'category_icon' => 'mdi-bus',
                    'category_color' => 'bg-gradient-orange',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '4200',
                    'category_parent' => '4000',
                    'category_name' => 'Vehicle',
                    'category_icon' => 'mdi-car',
                    'category_color' => 'bg-gradient-orange',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '5000',
                    'category_parent' => null,
                    'category_name' => 'Entertainment',
                    'category_icon' => 'mdi-human-handsup',
                    'category_color' => 'bg-gradient-purple',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '5100',
                    'category_parent' => '5000',
                    'category_name' => 'Vacation',
                    'category_icon' => 'mdi-beach',
                    'category_color' => 'bg-gradient-purple',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '5200',
                    'category_parent' => '5000',
                    'category_name' => 'Travel',
                    'category_icon' => 'mdi-airplane',
                    'category_color' => 'bg-gradient-purple',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '6000',
                    'category_parent' => null,
                    'category_name' => 'Income',
                    'category_icon' => 'mdi-cash-multiple',
                    'category_color' => 'bg-gradient-yellow',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '6100',
                    'category_parent' => '6000',
                    'category_name' => 'Business',
                    'category_icon' => 'mdi-domain',
                    'category_color' => 'bg-gradient-yellow',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '6200',
                    'category_parent' => '6000',
                    'category_name' => 'Freelance',
                    'category_icon' => 'mdi-card-account-details',
                    'category_color' => 'bg-gradient-yellow',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '6300',
                    'category_parent' => '6000',
                    'category_name' => 'Investments',
                    'category_icon' => 'mdi-currency-usd',
                    'category_color' => 'bg-gradient-yellow',
                    'created_at' => date('Y-m-d H:i:s')
                ]
            ]
        );
    }
}
