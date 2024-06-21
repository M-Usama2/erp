<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AttendanceSettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return array(
            'id' => $this->id,
            'department' => !empty($this->department_id) ? new DepartmentResource($this->department) : null,
            'designation' => !empty($this->designation_id) ? $this->designation : null,
            'employee' => !empty($this->employee_id) ? new EmployeeResource($this->employee) : null,
            'check_in' => date('H:i', strtotime($this->check_in)),
            'check_out' => date('H:i', strtotime($this->check_out)),
            'check_in_front' => date('h:i A', strtotime($this->check_in)),
            'check_out_front' => date('h:i A', strtotime($this->check_out)),
        );
    }
}
