<?php

namespace App\Models\Notification;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnnouncementAttachment extends Model
{
    use HasFactory;

    protected $fillable = [
        'announcement_id',
        'file',
    ];
}
