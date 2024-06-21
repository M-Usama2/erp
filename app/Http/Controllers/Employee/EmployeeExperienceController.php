<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Employee\EmployeeExperience;
use Illuminate\Http\Request;

class EmployeeExperienceController extends Controller
{
    public function show($id)
    {
        try {
            $exp = EmployeeExperience::where('employee_id', $id)->first();
            return response()->json([
                'status' => true,
                'data' => $exp,
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
        $exps = $request->exp;
        if (!empty($exps)) {
            $newData = null;
            try {
                foreach ($exps as $key => $exp) {
                    $newData[] = array(
                        'employee_id' => $id,
                        'organization' => $exp['organization'],
                        'start_date' => $exp['start_date'],
                        'end_date' => $exp['end_date'],
                        'position' => $exp['position'],
                        'leaving_reasons' => $exp['leaving_reasons'],
                    );
                }
                EmployeeExperience::insert($newData);

                return response()->json([
                    'status' => true,
                    'message' => "Experience Added!"
                ], 200);
            } catch (\Throwable $th) {
                return response()->json([
                    'status' => false,
                    'message' => $th->getMessage()
                ], 500);
            }
        }
    }

    public function update(Request $request, $exp_id)
    {
        $exp = EmployeeExperience::where('id', $exp_id)->first();
        if (!empty($exp)) {
            try {
                $exp->organization = $request->organization;
                $exp->start_date = $request->start_date;
                $exp->end_date = $request->end_date;
                $exp->position = $request->position;
                $exp->leaving_reasons = $request->leaving_reasons;

                $exp->save();

                return response()->json([
                    'status' => true,
                    'message' => "Experience Updated!"
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
        $employee = EmployeeExperience::where('id', $id)->first();

        if ($employee) {
            $employee->delete();
            return response()->json([
                'status' => true,
                'message' => 'Employee Experience Deleted!',
            ], 200);
        } else if ($id == 0) {
            if (!empty($request->deleted)) {
                try {
                    EmployeeExperience::destroy($request->deleted);
                    return response()->json([
                        'status' => true,
                        'message' => 'Employee Experience Deleted!',
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
