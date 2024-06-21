<?php

namespace App\Models\Payroll;

use App\Models\Employee\Employee;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalarySlip extends Model
{
    use HasFactory;

    protected $fillable = ['dated', 'employee_id'];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function salarySlipStructures()
    {
        return $this->hasMany(SalarySlipStructure::class);
    }

}
