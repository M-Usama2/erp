<?php

namespace App\Http\Controllers\Attendance;

use App\Http\Controllers\Controller;
use App\Http\Resources\AttendanceResource;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\HolidayResource;
use App\Http\Resources\LeaveRequestResource;
use App\Models\Attendance\Attendance;
use App\Models\Attendance\Holiday;
use App\Models\Attendance\LeaveRequest;
use App\Models\Employee\Employee;
use Illuminate\Http\Request;
use ZKLibrary;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->exists('dated')) {
            $dated = date('Y-m-d', strtotime($request->get('dated')));
        } else {
            $dated = date('Y-m-d');
        }
        $attendance = Attendance::whereDate('created_at', $dated)->get();
        return response()->json([
            'status' => true,
            'attendance' => AttendanceResource::collection($attendance),
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
            if ($request->exists('status')) {
                $attendances = $request->status;

                if ($request->exists('dated')) {
                    $dated = date('Y-m-d', strtotime($request->get('dated')));
                } else {
                    $dated = date('Y-m-d');
                }

                $data = [];
                $ip = $request->ip();
                foreach ($attendances as $attendance) {
                    $data[] = [
                        'employee_id' => $attendance['id'],
                        'leave_id' => $attendance['leave_id'],
                        'check_in' => $attendance['check_in'],
                        'check_out' => $attendance['check_out'],
                        'attended' => $attendance['status'] ? 1 : 0,
                        'created_at' => $dated,
                        'updated_at' => date('Y-m-d'),
                        'ip_address' => $ip
                    ];
                }
                Attendance::insert($data);
                return response()->json([
                    'message' => 'successful',
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $attendance = AttendanceResource::collection(Attendance::where('employee_id', $id)->get());
        $employee = new EmployeeResource(Employee::where('id', $id)->first());
        $holidays = HolidayResource::collection(Holiday::all());
        $leaves = LeaveRequestResource::collection(LeaveRequest::where('employee_id', $id)->where('status', 'approved')->get());
        if ($attendance) {
            return response()->json([
                'employee' => $employee,
                'holidays' => $holidays,
                'attendance' => $attendance,
                'leaves' => $leaves,
                'message' => 'successful',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Its 404 or no attendance taken yet!',
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
        try {
            if ($request->exists('status')) {
                $attendances = $request->status;
                $ip = $request->ip();
                foreach ($attendances as $attendance) {
                    $attendanceObject = Attendance::where('id', $attendance['id'])->first();
                    $attendanceObject->leave_id = $attendance['leave_id'] == 'Absent' ? null : $attendance['leave_id'];
                    $attendanceObject->check_in = $attendance['check_in'];
                    $attendanceObject->check_out = $attendance['check_out'];
                    $attendanceObject->attended = $attendance['status'];
                    $attendanceObject->ip_address = $ip;
                    $attendanceObject->save();
                }
                return response()->json([
                    $request->status,
                    'message' => 'successful',
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    function machineAttendance()
    {
        try {
            $zk = new ZKLibrary(env('ATTENDANCE_MACHINE_HOST'), env('ATTENDANCE_MACHINE_PORT'));
            $zk->connect();
            $zk->disableDevice();

            $attendances = $zk->getAttendance();
            $attend = [];
            foreach ($attendances as $key => $attendance) {
                $attend[] = (object)array(
                    "id" => $attendance[0],
                    "mac_id" => $attendance[1],
                    "mark" => date('H:i:s', strtotime($attendance[3])),
                    "dated" => date('Y-m-d', strtotime($attendance[3])),
                );
            }
            $zk->enableDevice();
            $zk->disconnect();
            return $attend;
        } catch (\Throwable $th) {
            return $th;
        }
    }

    public function machineStore(Request $request)
    {
        $machineAttendance = $this->machineAttendance();
        // return response()->json($machineAttendance);
        $ip = $request->ip();

        foreach ($machineAttendance as $key => $attendance) {
            $emp = Employee::where('mac_id', $attendance->mac_id)->first();
            if (!$emp) {
                continue;
            }
            $attend = Attendance::where('employee_id', $emp->id)->whereDate('created_at', $attendance->dated)->first();
            if ($attend) {
                $attend->check_out = $attendance->mark;
                $attend->save();
            } else {
                $attendData = array(
                    'attended' => 1,
                    'employee_id' => $emp->id,
                    'check_in' => $attendance->mark,
                    'check_out' => $attendance->mark,
                    'ip_address' => $ip,
                    'created_at' => $attendance->dated
                );
                Attendance::create($attendData);
            }
        }
        return response()->json($machineAttendance);
    }

    public function getAttendanceReport(Request $request, $employee_id)
    {
        $month = $request->has('month') ? date($request->get('month')) : date('m');
        $year = $request->has('year') ? date($request->get('year')) : date('Y');
        $employee = Employee::where('id', $employee_id)->first();
        $attendance = AttendanceResource::collection(Attendance::where('employee_id', $employee_id)
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->get())->toJson();
        return view('attendanceReport', compact('attendance', 'employee'));
    }
}
