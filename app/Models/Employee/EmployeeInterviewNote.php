<?php

namespace App\Models\Employee;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeInterviewNote extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'employee_interview_id',
        'notes',
        'pass'

    ];

    public function recruiter()
    {
        return $this->belongsTo(User::class);
    }
}
