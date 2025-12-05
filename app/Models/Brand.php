<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $fillable = ['id', 'name', 'count'];
    public $incrementing = false;
    protected $keyType = 'string';
}
