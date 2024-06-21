<?php

namespace App\Models\Sales;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = ['customer', 'quantity', 'description', 'product_id'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
