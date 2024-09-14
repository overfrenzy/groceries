<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Product extends Model
{
    use CrudTrait;
    use HasFactory;

    protected $fillable = [
        'name', 
        'description', 
        'mrp', 
        'selling_price', 
        'itemQuantityType', 
        'slug', 
        'image',
        'category_id'
    ];

    public function setSlugAttribute($value)
    {
        $this->attributes['slug'] = $value ?: Str::slug($this->attributes['name']);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function setImageAttribute($value)
    {
        if (is_file($value)) {
            $filename = time() . '.' . $value->getClientOriginalExtension();

            Storage::disk('public')->putFileAs('uploads', $value, $filename);

            $this->attributes['image'] = 'uploads/' . $filename;
        }
    }
}
