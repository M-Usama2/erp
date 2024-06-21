<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
            'priority' => $this->priority,
            'created_at' => $this->created_at,
            'created_at_formatted' => date('d M Y', strtotime($this->created_at)),
            'updated_at' => $this->updated_at,
            'user' => new UserResource($this->user),
            'comments' => $this->comments,
        );
    }
}
