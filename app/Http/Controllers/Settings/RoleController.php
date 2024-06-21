<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles = Role::whereNot('name', 'super-admin')->with('permissions')->get();
        return response()->json([
            'status' => true,
            'data' => $roles,
        ], 200);
    }
    public function permissions()
    {
        $permissions = Permission::all();
        return response()->json([
            'status' => true,
            'data' => $permissions,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        try {
            //code...
            $validateGroup = Validator::make(
                $request->all(),
                [
                    'name' => 'required|max:160',
                ]
            );

            if ($validateGroup->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateGroup->errors()
                ], 401);
            }

            $name = $request->name;
            $permissions = $request->permissions;
            $role = Role::create(array('name' => $name, 'guard_name' => 'sanctum'));
            $role->syncPermissions($permissions);
            return response()->json([
                'status' => true,
                'data' => $role,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $name)
    {
        if (!$request->user()->can('view roles')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $role = Role::findByName($name);
        $role->permissions;
        $permissions = Permission::all();
        $role_permission = $role->permissions->pluck('name');
        return response()->json([
            'status' => true,
            'data' => $role,
            'role_permission' => $role_permission,
            'permissions' => $permissions
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $name)
    {
        if (!$request->user()->can('edit roles')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $role = Role::findByName($name);
        try {
            //code...
            $validateGroup = Validator::make(
                $request->all(),
                [
                    'name' => 'required|max:160',
                ]
            );

            if ($validateGroup->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateGroup->errors()
                ], 401);
            }
            $name = $request->name;
            $permissions = $request->permissions;
            if ($role) {
                $role->name = $name;
                $role->save();
                $role->syncPermissions($permissions);
                return response()->json([
                    'status' => true,
                    'data' => $role,
                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        if (!$request->user()->can('delete roles')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $role = Role::where("id", $id)->first();
        $role->delete();
        return response()->json([
            'status' => true,
            'message' => "Role Deleted!",
        ], 200);
    }
}
