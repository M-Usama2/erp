<?php

namespace App\Models\Employee;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description'
    ];

    public function designations()
    {
        return $this->hasMany(Designation::class);
    }
}
