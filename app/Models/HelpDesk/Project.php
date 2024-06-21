<?php

namespace App\Models\HelpDesk;

use App\Models\Employee\EmployeeTeam;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'customer_id',
        'status',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function milestones()
    {
        return $this->hasMany(ProjectMilestone::class);
    }

    public function team()
    {
        return $this->belongsToMany(EmployeeTeam::class);
    }
}
