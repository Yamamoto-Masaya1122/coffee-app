<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Shop;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function create($id)
    {
        $shop = Shop::find($id);
        return Inertia::render('Review/Create', ['shop' => $shop]);
    }

    public function store(StoreReviewRequest $request)
    {
        $user = Auth::user();
        $reviewModel = new Review();
        $review = $reviewModel->saveReview([
            'user_id' => $user->id,
            'shop_id' => $request->shop_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);
        if ($review) {
            $status = 'review-created';
        }

        return redirect()->route('shop.detail', [
            'id' => $request->shop_id,
            'status' => $status
        ]);
    }

    // レビューの編集
    public function edit($id)
    {
        $review = Review::with('shop')->find($id);
        return Inertia::render('Review/Edit', ['review' => $review]);
    }

    // レビューの更新
    public function update(UpdateReviewRequest $request)
    {
        // ステータスの初期化
        $status = 'error';
        $reviewModel = new Review();
        $review = $reviewModel->updateReview($request);
        // ステータスの設定
        if ($review) {
            $status = 'review-updated';
        }

        return redirect()->route('shop.detail', [
            'id' => $review->shop_id,
            'status' => $status
        ]);
    }

    // レビューの削除
    public function destroy($id)
    {
        $status = 'error';
        $review = Review::find($id);
        if ($review) {
            $review->delete();
            $status = 'review-deleted';
        }

        return redirect()->route('shop.detail', [
            'id' => $review->shop_id,
            'status' => $status
        ]);
    }
}
