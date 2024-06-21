<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LeaveRequestResource extends JsonResource
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
            'employee_id' => $this->employee_id,
            'start_date' => $this->start_date,
            'start_date_formatted' => date('d M Y',strtotime($this->start_date)),
            'start_date_sql' => date('Y-m-d',strtotime($this->start_date)),
            'end_date' => $this->end_date,
            'end_date_formatted' => date('d M Y',strtotime($this->end_date)),
            'end_date_sql' => date('Y-m-d',strtotime($this->end_date)),
            'leave_id' => $this->leave_id,
            'reason' => $this->reason,
            'status' => $this->status,
            'comment' => $this->comment,
            'approved_by' => $this->approved_by,
            'rejected_by' => $this->rejected_by,
            'employee' => $this->employee,
            'leave' => $this->leave,
            'approvedBy' => $this->approvedBy,
            'rejectedBy' => $this->rejectedBy,
        );
    }
}
