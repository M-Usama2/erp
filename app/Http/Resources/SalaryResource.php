<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SalaryResource extends JsonResource
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
            'basic' => $this->basic,
            'status' => $this->status,
            'number_of_leaves' => $this->number_of_leaves,
            'created_at' => date('d M Y', strtotime($this->created_at)),
            'created_at_sql' => date('Y-m-d', strtotime($this->created_at)),
        );
    }
}
