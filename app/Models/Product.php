<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['article', 'article_pn', 'name', 'full_name', 'category', 'sort', 'price1', 'price2', 'quantity', 'isnew', 'quantityMarkdown', 'priceMarkdown'];
    protected $primaryKey = 'article';
    public $incrementing = false;
}
