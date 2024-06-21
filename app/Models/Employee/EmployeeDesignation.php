<?php

namespace App\Models\Employee;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeDesignation extends Model
{
    use HasFactory;

    protected $fillable = ['designation_id','employee_id'];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function designation()
    {
        return $this->belongsTo(Designation::class);
    }
}
