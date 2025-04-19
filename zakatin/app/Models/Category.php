<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'description'];
    protected $keyType = 'string';
    public $incrementing = false;

    public function persons()
    {
        return $this->hasMany(Person::class);
    }

    public static function booted()
    {
        static::creating(function (Category $category) {
            $category->id = (string) Str::uuid();
        });
    }
}
