<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Person extends Model
{
    /** @use HasFactory<\Database\Factories\PersonFactory> */
    use HasFactory;

    protected $table = 'persons';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'desc',
        'family_id',
        'category_id',
    ];

    public function familyMember()
    {
        return $this->hasMany(Person::class, 'family_id');
    }

    public function familyHead()
    {
        return $this->belongsTo(Person::class, 'family_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public static function booted(): void
    {
        static::creating(function (Person $person) {
            $person->id = Str::uuid();
        });
    }
}
