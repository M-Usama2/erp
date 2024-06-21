<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class GroupSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Permission::create(['name' => 'edit roles', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'add roles', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'view roles', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'delete roles', 'guard_name' => 'sanctum']);

        Permission::create(['name' => 'edit employees', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'add employees', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'view employees', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'delete employees', 'guard_name' => 'sanctum']);

        Permission::create(['name' => 'edit interview', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'add interview', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'view interview', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'delete interview', 'guard_name' => 'sanctum']);

        Permission::create(['name' => 'edit department', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'add department', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'view department', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'delete department', 'guard_name' => 'sanctum']);

        Permission::create(['name' => 'edit designation', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'add designation', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'view designation', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'delete designation', 'guard_name' => 'sanctum']);

        Permission::create(['name' => 'edit attendance', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'add attendance', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'view attendance', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'delete attendance', 'guard_name' => 'sanctum']);

        Permission::create(['name' => 'edit holiday', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'add holiday', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'view holiday', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'delete holiday', 'guard_name' => 'sanctum']);

        Permission::create(['name' => 'edit leave', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'add leave', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'view leave', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'delete leave', 'guard_name' => 'sanctum']);

        Permission::create(['name' => 'edit payhead', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'add payhead', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'view payhead', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'delete payhead', 'guard_name' => 'sanctum']);

        Permission::create(['name' => 'edit payroll', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'add payroll', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'view payroll', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'delete payroll', 'guard_name' => 'sanctum']);

        Permission::create(['name' => 'edit user', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'add user', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'view user', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'delete user', 'guard_name' => 'sanctum']);

        Permission::create(['name' => 'edit email-template', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'add email-template', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'view email-template', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'delete email-template', 'guard_name' => 'sanctum']);

        Permission::create(['name' => 'edit assets', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'add assets', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'view assets', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'delete assets', 'guard_name' => 'sanctum']);

        Permission::create(['name' => 'edit settings', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'add settings', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'view settings', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'delete settings', 'guard_name' => 'sanctum']);


        Permission::create(['name' => 'edit product-category', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'add product-category', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'view product-category', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'delete product-category', 'guard_name' => 'sanctum']);


        Permission::create(['name' => 'edit product', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'add product', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'view product', 'guard_name' => 'sanctum']);
        Permission::create(['name' => 'delete product', 'guard_name' => 'sanctum']);
    }
}
