<?php

namespace App\Models\Payroll;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PayHead extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'deduction', 'default_pay'];
}
