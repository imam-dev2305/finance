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
                    'category_name' => 'Bar, Cafe',
                    'category_icon' => 'mdi-coffee',
                    'category_color' => 'bg-gradient-red',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '1200',
                    'category_parent' => '1000',
                    'category_name' => 'Groceries',
                    'category_icon' => 'mdi-food-variant',
                    'category_color' => 'bg-gradient-red',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '1300',
                    'category_parent' => '1000',
                    'category_name' => 'Restaurant, fast-food',
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
                    'category_name' => 'Cloth & shoes',
                    'category_icon' => 'mdi-tshirt-crew',
                    'category_color' => 'bg-gradient-light-blue',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '2200',
                    'category_parent' => '2000',
                    'category_name' => 'Drug-store, chemist',
                    'category_icon' => 'mdi-toothbrush',
                    'category_color' => 'bg-gradient-light-blue',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '2300',
                    'category_parent' => '2000',
                    'category_name' => 'Electronics',
                    'category_icon' => 'mdi-cellphone',
                    'category_color' => 'bg-gradient-light-blue',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '2400',
                    'category_parent' => '2000',
                    'category_name' => 'Gift',
                    'category_icon' => 'mdi-gift',
                    'category_color' => 'bg-gradient-light-blue',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '2500',
                    'category_parent' => '2000',
                    'category_name' => 'Health & Beauty',
                    'category_icon' => 'mdi-lipstick',
                    'category_color' => 'bg-gradient-light-blue',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '2600',
                    'category_parent' => '2000',
                    'category_name' => 'Garden',
                    'category_icon' => 'mdi-watering-can',
                    'category_color' => 'bg-gradient-light-blue',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '2700',
                    'category_parent' => '2000',
                    'category_name' => 'Pet, animals',
                    'category_icon' => 'mdi-paw',
                    'category_color' => 'bg-gradient-light-blue',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '2800',
                    'category_parent' => '2000',
                    'category_name' => 'Stationery, tools',
                    'category_icon' => 'mdi-hammer-screwdriver',
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
                    'category_name' => 'Enerygy, utilities',
                    'category_icon' => 'mdi-coach-lamp',
                    'category_color' => 'bg-gradient-green',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '3200',
                    'category_parent' => '3000',
                    'category_name' => 'Maintenance, repair',
                    'category_icon' => 'mdi-hammer-screwdriver',
                    'category_color' => 'bg-gradient-green',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '3300',
                    'category_parent' => '3000',
                    'category_name' => 'Mortgage',
                    'category_icon' => 'mdi-home',
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
                    'category_name' => 'Life & Entertainment',
                    'category_icon' => 'mdi-human-handsup',
                    'category_color' => 'bg-gradient-purple',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '5100',
                    'category_parent' => '5000',
                    'category_name' => 'Vacation, holiday',
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
                    'category_id' => '5300',
                    'category_parent' => '5000',
                    'category_name' => 'Life events',
                    'category_icon' => 'mdi-cake',
                    'category_color' => 'bg-gradient-purple',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '5400',
                    'category_parent' => '5000',
                    'category_name' => 'Hobbies',
                    'category_icon' => 'mdi-heart',
                    'category_color' => 'bg-gradient-purple',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '5500',
                    'category_parent' => '5000',
                    'category_name' => 'Subscriptions',
                    'category_icon' => 'mdi-youtube',
                    'category_color' => 'bg-gradient-purple',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '5600',
                    'category_parent' => '5000',
                    'category_name' => 'Education, development',
                    'category_icon' => 'mdi-school',
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
                    'category_name' => 'Sale',
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
                ],
                [
                    'category_id' => '6400',
                    'category_parent' => '6000',
                    'category_name' => 'Rent',
                    'category_icon' => 'mdi-key-chain',
                    'category_color' => 'bg-gradient-yellow',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '7000',
                    'category_parent' => null,
                    'category_name' => 'Financial expenses',
                    'category_icon' => 'mdi-currency-usd',
                    'category_color' => 'bg-gradient-grey',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '7100',
                    'category_parent' => '7000',
                    'category_name' => 'Tax',
                    'category_icon' => 'mdi-hail',
                    'category_color' => 'bg-gradient-grey',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '7200',
                    'category_parent' => '7000',
                    'category_name' => 'Charges',
                    'category_icon' => 'mdi-cash-refund',
                    'category_color' => 'bg-gradient-grey',
                    'created_at' => date('Y-m-d H:i:s')
                ],
                [
                    'category_id' => '7300',
                    'category_parent' => '7000',
                    'category_name' => 'Communication',
                    'category_icon' => 'mdi-phone',
                    'category_color' => 'bg-gradient-grey',
                    'created_at' => date('Y-m-d H:i:s')
                ]
            ]
        );
    }
}
