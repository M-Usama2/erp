<?php

namespace App\Models\Employee;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeEducation extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'certification',
        'start_date',
        'end_date',
        'grade',
        'marking',
    ];
}
