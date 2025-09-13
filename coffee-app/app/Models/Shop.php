<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'location',
        'description',
        'created_by',
        'updated_by',
    ];

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function shopImages()
    {
        return $this->hasMany(ShopImage::class);
    }

    public function saveShop($request, $user)
    {
        $this->name = $request->name;
        $this->location = $request->location;
        $this->description = $request->description;
        $this->created_by = $user->id;
        $this->updated_by = $user->id;
        $this->save();

        return $this;
    }
}
