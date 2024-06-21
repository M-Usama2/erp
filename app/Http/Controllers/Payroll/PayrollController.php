<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use App\Http\Resources\AttendanceResource;
use App\Http\Resources\PaySlipResource;
use App\Models\Attendance\Attendance;
use App\Models\Employee\Salary;
use App\Models\Payroll\Payroll;
use Illuminate\Http\Request;
use App\Models\Payroll\SalarySlip;
use App\Models\Payroll\SalarySlipStructure;

class PayrollController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (!$request->user()->can('view payroll')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $SalarySlip = SalarySlip::all();
        return response()->json([
            'status' => true,
            'salaryslip' => PaySlipResource::collection($SalarySlip),
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
        if (!$request->user()->can('add payroll')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $res = $request->employee_id;
        $month = $request->has('dated') ? date("m", strtotime($request->get('dated'))) : date('m');
        $year = $request->has('dated') ? date("Y", strtotime($request->get('dated'))) : date('Y');
        $attendance = AttendanceResource::collection(Attendance::where('employee_id', $res)
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->get())->toJson();
        $attendance = json_decode($attendance);
        $dated = date('Y-m-d');
        $salarySlip = SalarySlip::create(['employee_id' => $res, 'dated' => $dated]);
        $arr = [];
        foreach ($request->payheads as $key => $payhead) {
            $arr[] = ['name' => $payhead['name'], 'amount' => $payhead['amount'], 'deduction' => $payhead['deduction'], 'salary_slip_id' => $salarySlip->id, 'pay_head_id' => $payhead['id'] ?? null];
        }
        if ($attendance && $arr[0]['name'] === 'Salary') {
            $late = 0;
            foreach ($attendance as $key => $value) {
                $late += $value->late == '1' ? 1 : 0;
            }
            $daySalary = $arr[0]['amount'] / $this->getWorkingDaysInMonth($month, $year);
            $arr[] = ['name' => 'Attendance', 'amount' => $late > 2 ? floor(floor($late / 3) * $daySalary) : 0, 'deduction' => 1, 'salary_slip_id' => $salarySlip->id, 'pay_head_id' => null];
        }
        SalarySlipStructure::insert($arr);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        if (!$request->user()->can('view payroll')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $Payroll = SalarySlip::where('id', $id)->first();
        if ($Payroll) {
            return response()->json([
                'status' => true,
                'Payroll' => new PaySlipResource($Payroll),
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'error' => '404 Payroll not found!',
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        if (!$request->user()->can('delete payroll')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $payroll = SalarySlip::where('id', $id)->first();
        if ($payroll) {
            $payroll->delete();
            return response()->json([
                'status' => true,
                'message' => 'payroll Deleted!',
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'error' => '404 payroll not found!',
            ], 404);
        };
    }

    /**
     * Get the number of days in a month excluding weekends.
     *
     * @param int $month
     * @param int $year
     * @return int
     */
    public function getWorkingDaysInMonth($month, $year)
    {
        $daysInMonth = cal_days_in_month(CAL_GREGORIAN, $month, $year);
        $workingDays = 0;

        for ($day = 1; $day <= $daysInMonth; $day++) {
            $date = date("Y-m-d", strtotime("$year-$month-$day"));
            $dayOfWeek = date("N", strtotime($date));

            if ($dayOfWeek < 6) {
                $workingDays++;
            }
        }

        return $workingDays;
    }
}
