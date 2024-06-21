<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LeaveResource extends JsonResource
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
            'reason' => $this->reason,
            'number_of_leaves' => $this->number_of_leaves,
            'dated' => date('d M Y', strtotime($this->dated)),
            'dated_sql' => date('Y-m-d', strtotime($this->dated)),
        );
    }
}
