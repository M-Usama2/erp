<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InterviewNoteResource extends JsonResource
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
            'pass' => $this->pass,
            'note' => $this->notes,
            'timed' => date('h:i A', strtotime($this->created_at)),
            'dated' => date('d M Y', strtotime($this->created_at))
        );
    }
}
