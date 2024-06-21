<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseResource extends JsonResource
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
            'expenseType' => $this->expenseType,
            'amount' => $this->amount,
            'status' => $this->status,
            'user_id' => $this->user_id,
            'note' => $this->note,
        );
    }
}
