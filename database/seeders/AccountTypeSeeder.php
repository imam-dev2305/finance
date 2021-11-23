<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AccountTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('account_types')->truncate();
        DB::table('account_types')->insert([
            ['account_type_name' => 'Cash'],
            ['account_type_name' => 'Saving'],
            ['account_type_name' => 'E-Money'],
            ['account_type_name' => 'Investement'],
            ['account_type_name' => 'Deposito'],
            ['account_type_name' => 'Holdings']
        ]);
    }
}
