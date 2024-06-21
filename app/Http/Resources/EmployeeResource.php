<?php

namespace App\Http\Resources;

use App\Models\Attendance\AttendanceSetting;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $attendance = $this->attendanceCount();
        $employee = array(
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'photo' => $this->photo ? asset('storage/' . $this->photo) : null,
            'religion' => $this->religion,
            'phone' => $this->phone,
            'gender' => $this->gender,
            'age' => $this->age,
            'nationality' => $this->nationality,
            'address' => $this->address,
            'hired' => $this->hired,
            'education' => EducationResource::collection($this->employeeEducation),
            'bank_account' => $this->bankAccount,
            'interviews' => !empty($this->employeeInterview) ? InterviewResource::collection($this->employeeInterview) : null,
            'latest_education' => new EducationResource($this->employeeEducation()->orderBy('end_date', 'DESC')->first()),
            'experience' => ExperianceResource::collection($this->employeeExperience),
            'document' => DocumentResource::collection($this->employeeDocument),
            'salaries' => !empty($this->salaries) ? SalaryResource::collection($this->salaries) : null,
            'current_salary' => $this->current_salary,
            'designation' => !empty($this->employeeDesignation->designation) ? $this->employeeDesignation->designation : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'attendance_count' => $attendance
        );
        $exp = 0;

        foreach ($employee['experience'] as $key => $expe) {
            $exp += $this->monthYears($expe->start_date, $expe->end_date);
        }
        $employee['YearExperience'] = $exp;

        return $employee;
    }

    private function attendanceCount()
    {
        $month = isset($this->additional['month']) ? $this->additional['month'] : null;
        if (!empty($month)) {
            $year = date('Y', strtotime($month));
            $attendance = $this->attendances()->whereYear('created_at', $year)->whereMonth('created_at', date('m', strtotime($month)))->get();
        } else {
            $attendance = $this->attendances;
        }
        $counts = array('present' => 0, 'absent' => 0, 'late' => 0, 'leave' => 0, 'total' => 0);
        if (!empty($attendance)) {
            foreach ($attendance as $key => $item) {
                if ($item->attended == 1) {
                    $late = $this->testLate($item->check_in);
                    if ($late) {
                        $counts['late'] += 1;
                    } else {
                        $counts['present'] += 1;
                    }
                } elseif ($item->leave_id) {
                    $counts['leave'] += 1;
                } else {
                    $counts['absent'] += 1;
                }
                $counts['total'] += 1;
            }
        }
        return (object)$counts;
    }

    private function testLate($check_in)
    {
        $settings = AttendanceSetting::whereNull('department_id')->whereNull('designation_id')->whereNull('employee_id')->first();
        $late = 0;
        if ($settings) {
            if (date('H:i', strtotime($check_in)) > date('H:i', strtotime($settings->check_in))) {
                $late = 1;
            }
        }
        return $late;
    }

    private function monthYears($date1, $date2)
    {
        $now = time(); // or your date as well
        if (!empty($date2))
            $datediff = strtotime($date2) - strtotime($date1);
        else
            $datediff = strtotime($now) - strtotime($date1);
        return ceil(($datediff / (60 * 60 * 24)) / 365);
    }
}
