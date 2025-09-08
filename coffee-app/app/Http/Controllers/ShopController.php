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

        return Inertia::render('Home', [
            'shops' => $shops,
            'newReviews' => $newReviews,
        ]);
    }

    public function detail($id)
    {
        // クエリパラメータからステータスを取得
        $status = request('status');

        $shop = Shop::find($id);
        // レビューを取得
        $reviews = Review::with('user')->where('shop_id', $id)->orderBy('created_at', 'desc')->get();
        return Inertia::render('Shop/Detail', [
            'shop' => $shop,
            'reviews' => $reviews,
            'status' => $status
        ]);
    }
}
