<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'file_name',
        'file_path',
        'file_type',
        'file_size',
        'file_extension',
        'file_mime',
        'file_original_name',
        'file_original_path',
        'thumbnail_id',
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function saveImage($image, $shop_id, $file_name, $file_extension)
    {
        $this->shop_id = $shop_id;
        $this->file_name = $file_name;
        $this->file_path = 'storage/shop_images/' . $file_name;
        $this->file_type = $image->getClientMimeType();
        $this->file_size = $image->getSize();
        $this->file_extension = $file_extension;
        $this->file_mime = $image->getClientMimeType();
        $this->file_original_name = $image->getClientOriginalName();
        $this->file_original_path = $image->getPathname();
        $this->save();
        return $this;
    }
}
