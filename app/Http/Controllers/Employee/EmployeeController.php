<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Http\Resources\EmployeeResource;
use App\Models\Employee\BankDetail;
use App\Models\Employee\Employee;
use App\Models\Employee\EmployeeDesignation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use ZKLibrary;

class EmployeeController extends Controller
{

    // Employeee Functions

    public function show(Request $request, $id = 0)
    {
        $month = null;
        if($request->has('month')){
            $month = $request->month;
        }
        if (!$request->user()->can('view employees')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $hired = $request->has('hired') ? $request->hired : 1;
        $employee = Employee::where('id', $id)->first();
        if ($employee) {
            // Single Employee
            return response()->json([
                'status' => false,
                'data' => new EmployeeResource($employee),
                'message' => 'Employee Found!',
            ], 200);
        } else if ($id == 0) {
            // List all Employess
            if ($request->exists('all')) {
                $employees = Employee::where('hired', $hired)->get();
                return response()->json([
                    'status' => false,
                    'data' => EmployeeResource::collection($employees)->additional(['month' => $month]),
                    'message' => 'Employee Found!',
                ], 200);
            } else {
                // $employees = Employee::where('hired', $hired)->paginate(10);
                $employees = Employee::where('hired', $hired)->get();
                return response()->json([
                    'status' => false,
                    'data' => EmployeeResource::collection($employees)->additional(['month' => $month]),
                    'pagination' => array(
                        // 'last_page' => !empty($employees->lastPage()) ? $employees->lastPage() : null
                    ),
                    'message' => 'Employee Found!',
                ], 200);
            }
        } else {
            return response()->json([
                'status' => true,
                'message' => 'Employee not Found!',
            ], 404);
        }
    }

    // Create new EMployee
    public function store(Request $request)
    {
        if (!$request->user()->can('add employees')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        try {
            $validateEmployee = Validator::make(
                $request->all(),
                [
                    'name' => 'required|max:160',
                    'photo' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg',
                    'gender' => 'nullable|max:10',
                    'age' => 'nullable|integer',
                    'phone' => 'required|max:160',
                    'email' => 'required|email',
                ]
            );

            if ($validateEmployee->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateEmployee->errors()
                ], 401);
            }

            $hired = $request->has('hired') ? $request->hired : 1;

            $emp = array(
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'hired' => $hired
            );

            // PhotoStorage
            if (!empty($request->photo)) {
                try {
                    $photo = $request->file('photo');
                    $filename = time() . '.' . $photo->getClientOriginalExtension();
                    $path = $request->photo->storeAs('photos/employees', $filename);
                    $emp['photo'] =   $path;
                } catch (\Throwable $th) {
                    return response()->json([
                        'status' => false,
                        'message' => $th->getMessage()
                    ], 500);
                }
            }

            if (!empty($request->gender)) {
                $emp['gender'] = $request->gender;
            }

            if (!empty($request->age)) {
                $emp['age'] = $request->age;
            }

            // Employee Storage
            $employee = Employee::create($emp);

            if (!empty($request->department_id) && $request->designation_id) {
                EmployeeDesignation::Create(
                    ['designation_id' => $request->designation_id, 'employee_id' => $employee->id]
                );
            }

            return response()->json([
                'data' => $employee,
                'status' => true,
                'message' => 'Emploee Added',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    function getUsersMachine()
    {
        $zk = new ZKLibrary(env('ATTENDANCE_MACHINE_HOST'), env('ATTENDANCE_MACHINE_PORT'));
        $zk->connect();
        $zk->disableDevice();
        $users = $zk->getUser();
        $zk->enableDevice();
        $zk->disconnect();
        $arr = [];
        foreach ($users as $key => $val) {
            $arr[] = (object)array(
                'id' => $val[0],
                'name' => is_string($val[1]) ? $val[1] : "Anonymous",
            );
        }
        return $arr;
    }

    // Create new EMployee
    public function storeMachine(Request $request)
    {
        try {

            $employees = $this->getUsersMachine();

            foreach ($employees as $key => $employee) {
                $emp = Employee::where('mac_id', $employee->id)->first();
                if ($emp) {
                    $emp->name = $employee->name;
                    $emp->save();
                } else {
                    $emp = array(
                        'mac_id' => $employee->id,
                        'name' =>  $employee->name,
                        'phone' => '00000000000',
                        'email' => $employee->name,
                        'address' => " ",
                        'hired' => 1
                    );
                    Employee::create($emp);
                }
            }

            return response()->json([
                'status' => true,
                'message' => 'Employees Refreshed',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    // Set designation
    public function setDesignation(Request $request)
    {
        try {
            if (!empty($request->designationid) && !empty($request->employee_id)) {
                $designation = EmployeeDesignation::create(array(
                    'employee_id' => $request->employee_id,
                    'designation_id' => $request->designationid,
                ));

                return response()->json([
                    'data' => $designation,
                    'status' => true,
                    'message' => 'Emploee Added',
                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        if (!$request->user()->can('edit employees')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $employee = Employee::where('id', $id)->first();
        $newData = [];
        $rules = [];

        if ($employee) {
            try {
                if (!empty($request->name)) {
                    $newData['name'] = $request->name;
                    $rule['name'] = 'required|max:160';
                }

                if (!empty($request->email)) {
                    $newData['email'] = $request->email;
                    $rule['email'] = 'required|email';
                }

                if (!empty($request->religion)) {
                    $newData['religion'] = $request->religion;
                    $rule['religion'] = 'required|max:160';
                }

                if (!empty($request->religion)) {
                    $newData['nationality'] = $request->nationality;
                    $rule['nationality'] = 'required|max:160';
                }

                if (!empty($request->gender)) {
                    $newData['gender'] = $request->gender;
                    $rule['gender'] = 'required|max:10';
                }


                if (!empty($request->age)) {
                    $newData['age'] = $request->age;
                    $rule['age'] = 'required|integer';
                }

                if (!empty($request->phone)) {
                    $newData['phone'] = $request->phone;
                    $rule['phone'] = 'required|max:160';
                }

                // if (!empty($request->photo)) {
                //     $newData['photo'] = $request->photo;
                //     $rule['photo'] = 'required|max:160';
                // }


                // Validation
                $validateEmployee = Validator::make(
                    $newData,
                    $rules
                );


                if ($validateEmployee->fails()) {
                    return response()->json([
                        'status' => false,
                        'message' => 'validation error',
                        'errors' => $validateEmployee->errors()
                    ], 401);
                }

                // PhotoStorage
                if (!empty($request->photo)) {
                    try {
                        $photo = $request->file('photo');
                        $filename = time() . '.' . $photo->getClientOriginalExtension();
                        $path = $request->photo->storeAs('photos/employees', $filename);
                        $employee->photo =   $path;
                    } catch (\Throwable $th) {
                        return response()->json([
                            'status' => false,
                            'message' => $th->getMessage()
                        ], 500);
                    }
                }

                $employee->update($newData);

                if (!empty($request->department_id) && !empty($request->designation_id)) {
                    $emp_des = EmployeeDesignation::where('employee_id', $employee->id)->first();
                    $emp_des->designation_id = $request->designation_id;
                    $emp_des->save();
                }

                return response()->json([
                    'data' => $employee,
                    'status' => true,
                    'message' => 'Emploee Updated',
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
                'message' => 'Employee not Found!'
            ], 404);
        }
    }

    public function delete(Request $request, $id = 0)
    {
        if (!$request->user()->can('delete employees')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $employee = Employee::where('id', $id)->first();

        if ($employee) {
            $employee->delete();
            return response()->json([
                'status' => true,
                'message' => 'Employee Education Deleted!',
            ], 200);
        } else if ($id == 0) {
            if (!empty($request->deleted)) {
                try {
                    Employee::destroy($request->deleted);
                    return response()->json([
                        'status' => true,
                        'message' => 'Employee Deleted!',
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

    public function bank(Request $request, $id)
    {
        try {
            $bank = BankDetail::where('employee_id', $id)->first();

            $validationArray = $bank ? [
                'account_title' => 'required|max:160',
                'account_number' => 'required|max:160',
                'iban_number' => 'required|max:160'
            ] : [
                'account_title' => 'nullable|max:160',
                'account_number' => 'nullable|max:160',
                'iban_number' => 'nullable|max:160'
            ];
            $validateBank = Validator::make(
                $request->all(),
                $validationArray
            );

            if ($validateBank->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateBank->errors()
                ], 401);
            }

            $data = [];

            if (!empty($request->account_title)) {
                $data['account_title'] = $request->account_title;
            }
            if (!empty($request->account_number)) {
                $data['account_number'] = $request->account_number;
            }
            if (!empty($request->iban_number)) {
                $data['iban_number'] = $request->iban_number;
            }

            if (!$bank) {
                $data['employee_id'] = $id;
                $bank = BankDetail::create($data);
            } else {
                $bank->update($data);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
