<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Employee\Department;
use App\Models\Employee\Designation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class DesignationController extends Controller
{
    public function show(Request $request, $id = 0)
    {
        $department = Designation::where('id', $id)->first();
        if ($department) {
            // Single Designation
            return response()->json([
                'status' => false,
                'data' => $department,
                'message' => 'Designation Found!',
            ], 200);
        } else if ($id == 0) {
            // List all Designation
            $departments = Designation::all();
            return response()->json([
                'status' => false,
                'data' => $departments,
                'message' => 'Designation Found!',
            ], 200);
        } else {
            return response()->json([
                'status' => true,
                'message' => 'Designation not Found!',
            ], 404);
        }
    }

    public function store(Request $request, $id)
    {
        if (!$request->user()->can('add designation')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        try {
            $department = Department::where('id', $id)->first();
            $validateDepart = Validator::make(
                $request->all(),
                [
                    'title' => 'required|max:160',
                    // 'description' => 'nullable',
                ]
            );

            if ($validateDepart->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateDepart->errors()
                ], 401);
            }

            if (!empty($request->title)) {
                $desig['title'] = $request->title;
            }

            // if (!empty($request->description)) {
            //     $desig['description'] = $request->description;
            // }

            // Designation Storage
            $department->designations()->save(new Designation($desig));

            return response()->json([
                'data' => $department,
                'status' => true,
                'message' => 'Designation Added',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        if (!$request->user()->can('edit designation')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $department = Designation::where('id', $id)->first();
        $newData = [];
        $rules = [];

        if ($department) {
            try {
                if (!empty($request->title)) {
                    $newData['title'] = $request->title;
                    $rule['title'] = 'required|max:160';
                }

                // if (!empty($request->description)) {
                //     $newData['description'] = $request->description;
                //     $rule['description'] = 'required';
                // }

                // Validation
                $validateDesignation = Validator::make(
                    $newData,
                    $rules
                );

                if ($validateDesignation->fails()) {
                    return response()->json([
                        'status' => false,
                        'message' => 'validation error',
                        'errors' => $validateDesignation->errors()
                    ], 401);
                }

                $department->update($newData);

                return response()->json([
                    'data' => $department,
                    'status' => true,
                    'message' => 'Designation Updated',
                ], 200);
            } catch (\Throwable $th) {
                return response()->json([
                    'status' => false,
                    'message' => $th->getMessage()
                ], 500);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Designation not Found!'
            ], 404);
        }
    }

    public function delete(Request $request, $id = 0)
    {
        if (!$request->user()->can('delete designation')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $department = Designation::where('id', $id)->first();

        if ($department) {
            $department->delete();
            return response()->json([
                'status' => true,
                'message' => 'Designation Deleted!',
            ], 200);
        } else if ($id == 0) {
            if (!empty($request->deleted)) {
                try {
                    Designation::destroy($request->deleted);
                    return response()->json([
                        'status' => true,
                        'message' => 'Designation Deleted!',
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
