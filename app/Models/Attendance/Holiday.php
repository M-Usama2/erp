<?php

namespace App\Models\Attendance;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Holiday extends Model
{
    use HasFactory;
    protected $fillable = [
        'occasion',
        'dated'
    ];
}
