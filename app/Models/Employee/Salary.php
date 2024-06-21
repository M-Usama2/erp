<?php

namespace App\Models\Employee;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{
    use HasFactory;

    protected $fillable = ['employee_id', 'basic', 'status', 'created_at'];

    protected function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
