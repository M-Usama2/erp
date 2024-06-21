<?php

namespace Database\Seeders;

use App\Models\Employee\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $data = [];
        for ($i = 0; $i < 100; $i++) {
            $data[] = array(
                'name' => substr(str_shuffle(str_repeat($pool, 5)), 0, 12),
                'religion' => substr(str_shuffle(str_repeat($pool, 5)), 0,5),
                'gender' => 'male',
                'age' => rand(20, 40),
                'phone' => rand(111, 999999),
                'email' => 'email@email' . rand(1, 999) . '.com',
                'nationality' => 'required',
                'address' => 'required',
            );
        }
        Employee::insert($data);
    }
}
