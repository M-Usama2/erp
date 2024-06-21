<?php

namespace App\Models\Notification;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnnouncementEmployees extends Model
{
    use HasFactory;

    protected $fillable = [
        'announcement_id',
        'employee_id',
        'is_read',
        'read_at',
    ];
}
