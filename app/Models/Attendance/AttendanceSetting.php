<?php

namespace App\Models\Attendance;

use App\Models\Employee\Department;
use App\Models\Employee\Designation;
use App\Models\Employee\Employee;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceSetting extends Model
{
    use HasFactory;
    protected $fillable = [
        'department_id',
        'designation_id',
        'employee_id',
        'check_in',
        'check_out',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
    public function designation()
    {
        return $this->belongsTo(Designation::class);
    }
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
