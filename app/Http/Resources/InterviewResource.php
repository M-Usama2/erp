<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InterviewResource extends JsonResource
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
            'time_in' => date('h:i A', strtotime($this->start_date)),
            'time_out' => date('h:i A', strtotime($this->end_date)),
            'status' => $this->status,
            'notes' => !empty($this->employeeInterviewNotes) ? InterviewNoteResource::collection($this->employeeInterviewNotes) : null,
            'dated' => date('d M Y', strtotime($this->start_date))
        );
    }
}
