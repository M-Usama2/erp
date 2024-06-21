<?php

namespace App\Models\Employee;

use App\Models\Attendance\Attendance;
use App\Models\Attendance\LeaveRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    protected $fillable = [
        'mac_id',
        'name',
        'photo',
        'religion',
        'phone',
        'gender',
        'age',
        'email',
        'nationality',
        'address',
        'hired'
    ];

    public function employeeEducation()
    {
        return $this->hasMany(EmployeeEducation::class, 'employee_id');
    }

    public function employeeExperience()
    {
        return $this->hasMany(EmployeeExperience::class, 'employee_id');
    }

    public function employeeDocument()
    {
        return $this->hasMany(EmployeeDocument::class);
    }

    public function employeeInterview()
    {
        return $this->hasMany(EmployeeInterview::class);
    }

    public function employeeDesignation()
    {
        return $this->hasOne(EmployeeDesignation::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function salaries()
    {
        return $this->hasMany(Salary::class);
    }

    public function current_salary()
    {
        return $this->hasOne(Salary::class)->where('status', 1)->latest();
    }

    public function bankAccount()
    {
        return $this->hasOne(BankDetail::class);
    }

    public function leaveRequests()
    {
        return $this->hasMany(LeaveRequest::class);
    }
}
