<?php

namespace App\Models\Employee;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeExperience extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'organization',
        'position',
        'leaving_reasons',
        'start_date',
        'end_date'
    ];
}
