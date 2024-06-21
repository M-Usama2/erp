<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HolidayResource extends JsonResource
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
            'occasion' => $this->occasion,
            'dated' => date('d M Y', strtotime($this->dated)),
            'dated_sql' => date('Y-m-d', strtotime($this->dated)),
        );
    }
}
