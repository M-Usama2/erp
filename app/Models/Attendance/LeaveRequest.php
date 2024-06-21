<?php

namespace App\Models\Attendance;

use App\Models\Employee\Employee;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveRequest extends Model
{
    use HasFactory;
    protected $fillable = [
        'employee_id',
        'start_date',
        'end_date',
        'leave_id',
        'reason',
        'status',
        'comment',
        'approved_by',
        'rejected_by',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function leave()
    {
        return $this->belongsTo(Leave::class);
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function rejectedBy()
    {
        return $this->belongsTo(User::class, 'rejected_by');
    }
    
}
