<?php

namespace App\Models\Sales;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', "description", "parent_id"];

    function subCategory()
    {
        return $this->hasMany(Category::class, 'parent_id', 'id');
    }
}
