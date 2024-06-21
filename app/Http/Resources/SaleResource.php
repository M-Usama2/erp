<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SaleResource extends JsonResource
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
            'id'=>$this->id,
            'customer'=>$this->customer,
            'quantity'=>$this->quantity,
            'description'=>$this->description,
            'product'=>$this->product
        );
    }
}
