<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EducationResource extends JsonResource
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
            'employee_id' => $this->id,
            'title' => $this->employee_id,
            'certification' => $this->certification,
            'start_date' => date('d M Y', strtotime($this->start_date)),
            'end_date' => date('d M Y', strtotime($this->end_date)),
            'start_date_db' => date('Y-m-d', strtotime($this->start_date)),
            'end_date_db' => date('Y-m-d', strtotime($this->end_date)),
            'grade' => $this->grade,
            'marking' => $this->marking,
        );
    }
}
