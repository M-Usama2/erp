<?php

namespace App\Models\Sales;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'price',
        'stock',
        'status',
        'description',
        'category_id'
    ];

    public function category(){
        return $this->belongsTo(Category::class);
    }
}
