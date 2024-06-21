<?php

namespace App\Http\Resources;

use App\Models\Attendance\AttendanceSetting;
use Illuminate\Http\Resources\Json\JsonResource;

class AttendanceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $late = $this->testLate();
        return array(
            'id' => $this->id,
            'employee_id' => $this->employee_id,
            'name' => $this->employee->name,
            'leave_id' => $this->leave_id,
            'check_in' => $this->check_in ? date('H:i', strtotime($this->check_in)) : '',
            'check_out' => $this->check_out ? date('H:i', strtotime($this->check_out)) : '',
            'time_in' => $this->check_in ? date('h:i A', strtotime($this->check_in)) : '',
            'time_out' => $this->check_out ? date('h:i A', strtotime($this->check_out)) : '',
            'status' => $this->attended ? true : false,
            'late' => $late,
            'created_at' => date('Y-m-d', strtotime($this->created_at)),
        );
    }

    private function testLate()
    {
        $settings = AttendanceSetting::whereNull('department_id')->whereNull('designation_id')->whereNull('employee_id')->first();
        $late = 0;
        if ($settings) {
            if (date('H:i', strtotime($this->check_in)) > date('H:i', strtotime($settings->check_in))) {
                $late = 1;
            }
        }
        return $late;
    }
}
