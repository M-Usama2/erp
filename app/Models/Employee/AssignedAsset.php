<?php

namespace App\Models\Employee;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignedAsset extends Model
{
    use HasFactory;
    protected $fillable = [
        'employee_id',
        'name',
        'identity',
        'cost',
        'description',
        'document',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
