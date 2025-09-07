<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Shop;
use App\Http\Requests\StoreReviewRequest;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function create($id)
    {
        $shop = Shop::find($id);
        return Inertia::render('Review/Create', ['shop' => $shop]);
    }

    public function store(StoreReviewRequest $request)
    {
        $reviewModel = new Review();
        $review = $reviewModel->saveReview($request);

        return redirect()->route('shop.detail', ['id' => $request->shop_id]);
    }
}
