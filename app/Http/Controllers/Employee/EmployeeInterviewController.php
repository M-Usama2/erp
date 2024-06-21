<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Http\Resources\InterviewResource;
use App\Models\Employee\Employee;
use App\Models\Employee\EmployeeInterview;
use App\Models\Employee\EmployeeInterviewNote;
use Illuminate\Http\Request;

class EmployeeInterviewController extends Controller
{
    public function show($id = null)
    {
        try {
            if ($id) {
                $interview = EmployeeInterview::where('employee_id', $id)->first();
                $data = array(
                    'interview' => new InterviewResource($interview),
                );
            } else {
                $interviews = EmployeeInterview::all();
                $data = array(
                    'interviews' => $interviews,
                );
            }
            return response()->json([
                'status' => true,
                'data' => $data,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    //
    public function store(Request $request, $id)
    {
        try {
            //code...
            $employee = Employee::where('id', $id)->first();
            if (!empty($request->start_date) && $employee) {
                $start_date = $request->start_date;
                $end_date = $request->end_date;
                $dated = $request->dated;
                $data = [
                    'employee_id' => $id,
                    'start_date' => date('Y-m-d', strtotime($dated)) . ' ' . date('H:i', strtotime($start_date)),
                    'end_date' => date('Y-m-d', strtotime($dated)) . ' ' . date('H:i', strtotime($end_date))
                ];
                EmployeeInterview::create($data);
                return response()->json([
                    'status' => true,
                    'message' => "Interview Scheduled!"
                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function store_notes(Request $request, $interview_id)
    {
        try {
            //code...
            # code...
            $interview = EmployeeInterview::where('id', $interview_id)->first();
            $user = $request->user();
            $data = [];
            if ($interview && $user) {
                if (!empty($request->notes)) {
                    $data['notes'] = $request->notes;
                }
                $data['user_id'] = $user->id;
            }
            if (!empty($request->pass)) {
                $data['pass'] = $request->pass;
            }else{
                $data['pass'] = 0;
            }
            $interview->employeeInterviewNotes()->save(new EmployeeInterviewNote($data));
            return response()->json([
                'status' => true,
                'message' => "Interview Notes Recorded!"
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function setStatus(Request $request, $id)
    {
        try {
            $employee = Employee::where('id', $id)->first();
            if ($employee && !empty($request->hired)) {
                $employee->hired = $request->hired;
                $employee->save();
                return response()->json([
                    'status' => true,
                    'message' => "Employee status changes!"
                ], 200);
            } else {
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function delete(Request $request, $id)
    {
        EmployeeInterview::where('id', $id)->delete();
        return response()->json([
            'status' => true,
            'message' => 'EmployeeInterview Deleted!',
        ], 200);
    }
}
