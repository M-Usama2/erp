<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Employee\EmployeeEducation;
use Illuminate\Http\Request;

class EmployeeEducationController extends Controller
{
    public function show($id)
    {
        try {
            $education = EmployeeEducation::where('employee_id', $id)->first();
            return response()->json([
                'status' => true,
                'data' => $education,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function store(Request $request, $id)
    {
        $educations = $request->education;
        if (!empty($educations)) {
            $newData = null;
            try {
                foreach ($educations as $key => $education) {
                    $newData[] = array(
                        'employee_id' => $id,
                        'certification' => $education['certification'],
                        'start_date' => $education['start_date'],
                        'end_date' => $education['end_date'],
                        'grade' => $education['grade'],
                        'marking' => $education['marking'],
                    );
                }
                EmployeeEducation::insert($newData);

                return response()->json([
                    'status' => true,
                    'message' => "Education Added!"
                ], 200);
            } catch (\Throwable $th) {
                return response()->json([
                    'status' => false,
                    'message' => $th->getMessage()
                ], 500);
            }
        }
    }

    public function update(Request $request, $education_id)
    {
        $education = EmployeeEducation::where('id', $education_id)->first();

        if (!empty($education)) {
            try {

                $education->certification = $request->certification;
                $education->start_date = $request->start_date;
                $education->end_date = $request->end_date;
                $education->grade = $request->grade;
                $education->marking = $request->marking;

                $education->save();

                return response()->json([
                    'status' => true,
                    'message' => "Education Updated!"
                ], 200);
            } catch (\Throwable $th) {
                return response()->json([
                    'status' => false,
                    'message' => $th->getMessage()
                ], 500);
            }
        }
    }

    public function delete(Request $request, $id = 0)
    {
        $employee = EmployeeEducation::where('id', $id)->first();

        if ($employee) {
            $employee->delete();
            return response()->json([
                'status' => true,
                'message' => 'Employee Education Deleted!',
            ], 200);
        } else if ($id == 0) {
            if (!empty($request->deleted)) {
                try {
                    EmployeeEducation::destroy($request->deleted);
                    return response()->json([
                        'status' => true,
                        'message' => 'Employee Education Deleted!',
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
