<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'description'];

    public static function booted()
    {
        static::creating(function (Category $category) {
            $category->id = (string) Str::uuid();
        });
    }
}
