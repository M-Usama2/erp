<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function show(Request $request, $username = null)
    {
        if (!$request->user()->can('view user')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        if ($username) {
            // Single User
            $user = User::where('username', $username)->first();
            if ($user) {
                return response()->json([
                    'status' => true,
                    'user' => new UserResource($user)
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'User not found!',
                ], 404);
            }
        } else {
            // All Users
            $authUser = auth()->user();
            $users = User::where('id', '!=', $authUser->id)->get();
            return response()->json([
                'status' => true,
                'users' => UserResource::collection($users)
            ], 200);
        }
    }

    public function store(Request $request)
    {
        if (!$request->user()->can('add user')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        try {
            //Validated
            $validateUser = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'username' => ['required', 'string', 'unique:users', 'regex:/^\S*$/u'],
                    'email' => 'required|email|unique:users,email',
                    'password' => 'required|min:6'
                ]
            );

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user = User::create([
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            if (!empty($request->role_name))
                $user->assignRole($request->role_name);

            return response()->json([
                'status' => true,
                'user' => $user,
                'message' => 'User Created Successfully',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $username)
    {
        if (!$request->user()->can('edit user')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $user = User::where('username', $username)->first();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Not Found!',
            ], 404);
        }
        $validation = [];
        $userData = [];
        try {
            if (!empty($request->username)) {
                if ($request->username != $user->username) {
                    $validation['username'] = ['required', 'string', 'unique:users', 'regex:/^\S*$/u'];
                } else {
                    $validation['username'] = 'required';
                }
                $userData['username'] = $request->username;
            }
            if (!empty($request->email)) {
                if ($request->email != $user->email) {
                    $validation['email'] = 'required|email|unique:users,email';
                } else {
                    $validation['email'] = 'required';
                }
                $userData['email'] = $request->email;
            }
            if (!empty($request->password)) {
                $validation['password'] = 'required|min:6';
                $userData['password'] = Hash::make($request->password);
            }
            if (!empty($request->name)) {
                $validation['name'] = 'required';
                $userData['name'] = $request->name;
            }
            $validateUser = Validator::make($userData, $validation);
            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user->update($userData);
            if (!empty($request->role_name)) {
                if (!$user->hasRole($request->role_name))
                    $user->assignRole($request->role_name);
            }

            return response()->json([
                'status' => true,
                'user' => $user,
                'message' => 'User Updated!',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function delete(Request $request, $id = 0)
    {
        if (!$request->user()->can('delete user')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $user = User::where('id', $id)->first();

        if ($user) {
            $user->delete();
            return response()->json([
                'status' => true,
                'message' => 'Employee Education Deleted!',
            ], 200);
        } else if ($id == 0) {
            if (!empty($request->deleted)) {
                try {
                    User::destroy($request->deleted);
                    return response()->json([
                        'status' => true,
                        'message' => 'User Deleted!',
                    ], 200);
                } catch (\Throwable $th) {
                    return response()->json([
                        'status' => false,
                        'message' => $th->getMessage()
                    ], 500);
                }
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Not Found!',
            ], 404);
        }
    }
}
