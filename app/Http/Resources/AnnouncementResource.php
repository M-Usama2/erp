<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AnnouncementResource extends JsonResource
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
            'content' => $this->content,
            'published_at' => $this->dated,
            'published_at_formatted' => date('d M Y', strtotime($this->dated)),
            'attachments' => $this->attachments,
            'employees' => $this->employees,
        );
    }
}
