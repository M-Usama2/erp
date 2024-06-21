<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Http\Resources\DepartmentResource;
use App\Models\Employee\Department;
use App\Models\Employee\Designation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DepartmentController extends Controller
{
    public function show(Request $request, $id = 0)
    {
        $department = Department::where('id', $id)->first();

        if ($department) {
            $department->designations;
            // Single Department
            return response()->json([
                'status' => false,
                'data' => $department,
                'message' => 'Department Found!',
            ], 200);
        } else if ($id == 0) {
            // List all Department
            $departments = DepartmentResource::collection(Department::all());


            return response()->json([
                'status' => false,
                'data' => $departments,
                'message' => 'Department Found!',
            ], 200);
        } else {
            return response()->json([
                'status' => true,
                'message' => 'Department not Found!',
            ], 404);
        }
    }

    public function store(Request $request)
    {
        if (!$request->user()->can('add department')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        try {
            $validateDepart = Validator::make(
                $request->all(),
                [
                    'title' => 'required|max:160',
                    // 'description' => 'nullable'
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
                $dept['title'] = $request->title;
            }

            // if (!empty($request->description)) {
            //     $dept['description'] = $request->description;
            // }

            // Department Storage
            $department = Department::create($dept);

            $desigations = [];

            if (!empty($request->designations)) {

                foreach ($request->designations as $key => $desigation) {
                    if (!empty($desigation)) {
                        $desigations[] = array('title' => $desigation, 'department_id' => $department->id, 'created_at' => date('Y-m-d H:i:s'));
                    }
                }

                Designation::insert($desigations);
            }



            return response()->json([
                'data' => $department,
                'status' => true,
                'message' => 'Department Added',
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
        if (!$request->user()->can('edit department')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $department = Department::where('id', $id)->first();
        $newData = [];
        $rules = [];

        if ($department) {
            try {
                if (!empty($request->title)) {
                    $newData['title'] = $request->title;
                    $rule['title'] = 'required|max:160';
                }

                // Validation
                $validateDepartment = Validator::make(
                    $newData,
                    $rules
                );

                if ($validateDepartment->fails()) {
                    return response()->json([
                        'status' => false,
                        'message' => 'validation error',
                        'errors' => $validateDepartment->errors()
                    ], 401);
                }

                $department->update($newData);

                // Added/updated Designation
                if (!empty($request->designations)) {
                    foreach ($request->designations as $key => $desigation) {
                        if (empty($desigation[0])) {
                            $desigations[] = array('title' => $desigation[1], 'department_id' => $department->id, 'created_at' => date('Y-m-d H:i:s'));
                        } else {
                            $upadte_designation = Designation::where('id', $desigation[0])->first();
                            $upadte_designation->title = $desigation[1];
                            $upadte_designation->save();
                        }
                    }

                    if (!empty($desigations))
                        Designation::insert($desigations);
                }

                //deleted designatons
                if (!empty($request->deledtedDesignations)) {
                    Designation::destroy($request->deledtedDesignations);
                }

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
                'message' => 'Department not Found!'
            ], 404);
        }
    }

    public function delete(Request $request, $id = 0)
    {
        if (!$request->user()->can('delete department')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $department = Department::where('id', $id)->first();

        if ($department) {
            $department->delete();
            return response()->json([
                'status' => true,
                'message' => 'Department Deleted!',
            ], 200);
        } else if ($id == 0) {
            if (!empty($request->deleted)) {
                try {
                    Department::destroy($request->deleted);
                    return response()->json([
                        'status' => true,
                        'message' => 'Department Deleted!',
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
