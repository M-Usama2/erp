<?php

namespace App\Models\Employee;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeTeamMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'employee_team_id',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function team()
    {
        return $this->belongsTo(EmployeeTeam::class);
    }
}
