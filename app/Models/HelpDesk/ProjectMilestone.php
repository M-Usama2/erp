<?php

namespace App\Models\HelpDesk;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectMilestone extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'due_date',
        'status',
        'project_id',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
