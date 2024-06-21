<?php

namespace App\Models\Employee;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeTeam extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
    ];

    public function members()
    {
        return $this->hasMany(EmployeeTeamMember::class);
    }

    public function addMember($employeeId)
    {
        return $this->members()->firstOrCreate([
            'employee_id' => $employeeId,
        ]);
    }
}
