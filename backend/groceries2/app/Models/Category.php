<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Category extends Model
{
    use CrudTrait;
    use HasFactory;

    protected $fillable = ['name', 'icon'];

    public function products()
{
    return $this->hasMany(Product::class);
}

    public function setIconAttribute($value)
    {
        if (is_file($value)) {
            $filename = time() . '.' . $value->getClientOriginalExtension();

            Storage::disk('public')->putFileAs('uploads', $value, $filename);

            $this->attributes['icon'] = 'uploads/' . $filename;
        }
    }
}
