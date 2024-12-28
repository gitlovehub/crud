<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_name',
        'product_thumbnail',
        'product_price',
        'is_active',
    ];

    public $attributes = ['is_active' => 0];

}
