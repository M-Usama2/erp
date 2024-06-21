<?php

namespace App\Models\Hotel;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomType extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'price',
        'hotel_id',
        'image',
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }
}
