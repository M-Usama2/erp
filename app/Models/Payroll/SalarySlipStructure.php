<?php

namespace App\Models\Payroll;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalarySlipStructure extends Model
{
    use HasFactory;

    protected $fillable = ['name','amount','deduction','salary_slip_id','pay_head_id'];

    public function salarySlip()
    {
        return $this->belongsTo(SalarySlip::class);
    }
}
