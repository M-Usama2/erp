<?php

namespace App\Models\Employee;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Employee\EmployeeInterviewNote;

class EmployeeInterview extends Model
{
    use HasFactory;
    protected $fillable = [
        'employee_id',
        'start_date',
        'end_date',
        'status'
    ];

    public function employeeInterviewNotes()
    {
        return $this->hasMany(EmployeeInterviewNote::class, 'employee_interview_id');
    }
}
