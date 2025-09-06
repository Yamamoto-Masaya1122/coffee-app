<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use App\Models\Shop;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index()
    {
        // $shops = Shop::all();
        $shops = Shop::with('reviews')->get();
        //新着のレビューを5つ取得
        $newReviews = Review::with('shop', 'user')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        dd($newReviews);
        return Inertia::render('Home', [
            'shops' => $shops,
            'newReviews' => $newReviews,
        ]);
    }
}
