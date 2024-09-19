<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use CrudTrait;
    protected $fillable = [
        'username', 'email', 'phone', 'zip', 'address', 'totalOrderAmount', 'user_id', 'paymentId'
    ];

    public function items()
    {
        return $this->hasMany(OrderItemList::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
