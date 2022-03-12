<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(
            [
                'user_id' => Uuid::uuid1(),
                'name' => 'Administrator',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('12345')
            ]
        );
    }
}
