<?php

namespace App\Models\Notification;

use App\Models\Employee\Employee;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'dated',
        'created_by'
    ];

    public function attachments()
    {
        return $this->hasMany(AnnouncementAttachment::class);
    }

    public function employees()
    {
        return $this->hasMany(AnnouncementEmployees::class);
    }
}
