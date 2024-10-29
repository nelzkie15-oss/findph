<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{

    protected $fillable = [
        'buyer_id',
        'seller_id',
        'title',
        'description',
        'image',
        'price',
        'link',
        'payment_status'
    ];

    use HasFactory;
}
