<?php

namespace App\Models\Attendance;

use App\Models\Employee\Employee;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;
    protected $fillable = [
        'attended',
        'employee_id',
        'leave_id',
        'check_in',
        'check_out', 'ip_address',
        'created_at'
    ];

    public function leave()
    {
        return $this->belongsTo(Leave::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
