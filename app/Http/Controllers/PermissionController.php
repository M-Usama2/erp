<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    public function roles()
    {
        $roles = Role::where('name', '!=', 'super-admin')->get();
        return response()->json([
            'status' => true,
            'message' => 'Successfuly Fetched!',
            'roles' => $roles,
        ], 200);
    }
}
