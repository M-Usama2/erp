<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Http\Resources\SalaryResource;
use App\Models\Employee\Salary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SalaryController extends Controller
{
    /**
     * Display a listing of the active salaries.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $salaries = Salary::where('status', 1)->get();
        return response()->json([
            'status' => true,
            'salaries' => SalaryResource::collection($salaries),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $employee_id)
    {
        try {
            //code...
            $validateSalary = Validator::make(
                $request->all(),
                [
                    'basic' => 'required',
                    // 'basic' => 'required|regex:/^[0-9]+(\.[0-9][0-9]?)?$/',
                    'created_at' => 'required'
                ]
            );

            if ($validateSalary->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateSalary->errors()
                ], 401);
            }


            if (!empty($request->basic)) {
                $data_array['basic'] = $request->basic;
            }

            $data_array['employee_id'] = $employee_id;

            $salary = Salary::create($data_array);

            return response()->json([
                'status' => true,
                'message' => 'Saved!',
                'salaries' => $salary,
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $salary = Salary::where('id', $id)->first();
        if ($salary) {
            return response()->json([
                'status' => true,
                'salary' => new SalaryResource($salary),
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => "404 Salary not found!",
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $salary = Salary::where('id', $id)->first();
        if (!$salary) {
            return response()->json([
                'status' => false,
                'message' => "404 Salary not found!",
            ], 404);
        }
        try {
            //code...
            $validateSalary = Validator::make(
                $request->all(),
                [
                    'basic' => 'required',
                    // 'basic' => 'required|regex:/^[0-9]+(\.[0-9][0-9]?)?$/',
                    'created_at' => 'required'
                ]
            );

            if ($validateSalary->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateSalary->errors()
                ], 401);
            }


            if (!empty($request->basic)) {
                $data_array['basic'] = $request->basic;
            }

            $salary->update($data_array);

            return response()->json([
                'status' => true,
                'message' => 'Updated!',
                'salaries' => new SalaryResource($salary),
            ], 200);
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($employee_id, $id)
    {
        $salary = Salary::where('id', $id)->first();
        if ($salary) {
            $salary->delete();
            return response()->json([
                'status' => true,
                'message' => 'Salary Deleted!',
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'error' => '404 Salary not found!',
            ], 404);
        }
    }

    public function status($employee_id, $id)
    {
        try {
            Salary::where('employee_id', $employee_id)->update(['status' => 0]);
            $salary = Salary::where('id', $id)->first();
            $salary->update(['status' => 1]);
            return response()->json([
                'status' => true,
                'message' => 'Salary Deleted!',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
