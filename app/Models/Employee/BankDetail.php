<?php

namespace App\Models\Employee;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankDetail extends Model
{
    use HasFactory;
    protected $fillable = ['account_title', 'account_number', 'iban_number','employee_id'];
}
