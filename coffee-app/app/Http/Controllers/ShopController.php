<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Shop;
use App\Http\Requests\StoreShopRequest;
use App\Models\ShopImage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Nette\Utils\Random;

class ShopController extends Controller
{
    public function index()
    {
        // クエリパラメータからステータスを取得
        $status = request('status');
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
            'status' => $status,
        ]);
    }

    public function detail($id)
    {
        $shop = Shop::with('shopImages')->find($id);

        // クエリパラメータからステータスを取得
        $status = request('status');

        // レビューを取得
        $reviews = Review::with('user')->where('shop_id', $id)->orderBy('created_at', 'desc')->get();
        return Inertia::render('Shop/Detail', [
            'shop' => $shop,
            'reviews' => $reviews,
            'status' => $status
        ]);
    }

    public function create()
    {
        return Inertia::render('Shop/Create');
    }

    public function store(StoreShopRequest $request)
    {
        $user = Auth::user();
        // ユーザーがログインしていない場合はリダイレクト
        if (!$user) {
            return redirect()->route('login');
        }

        $status = 'error';
        //トランザクションを開始
        DB::beginTransaction();
        try {
            //店舗の保存
            $shopModel = new Shop();
            $shop = $shopModel->saveShop($request, $user);

            //店舗の画像を保存
            if ($request->file('images')) {
                $images = $request->file('images');
                foreach ($images as $image) {
                    // 画像の拡張子を取得
                    $extension = $image->getClientOriginalExtension();
                    // 乱数を作成
                    $random = Random::generate(16);
                    // 画像の名前を生成
                    $fileName = $shop->image = $shop->id . '_' . $random . '.' . $extension;
                    $shopImageModel = new ShopImage();
                    $shopImageModel->saveImage([
                        'shop_id' => $shop->id,
                        'file_name' => $fileName,
                        'file_path' => 'storage/shop_images/' . $fileName,
                        'file_type' => $image->getClientMimeType(),
                        'file_size' => $image->getSize(),
                        'file_extension' => $extension,
                        'file_mime' => $image->getClientMimeType(),
                        'file_original_name' => $image->getClientOriginalName(),
                        'file_original_path' => $image->getPathname(),
                    ]);
                    // 画像の保存
                    $image->storeAs('shop_images', $fileName);
                }
            }
            DB::commit();

            $status = 'shop-created';
        } catch (\Exception $e) {
            $message = $e->getMessage();
            Log::error($message);
            DB::rollBack();
            throw $e;
        }

        // ステータス
        if ($shop) {
            $status = 'shop-created';
        }

        return redirect()->route('shop.index', [
            'status' => $status,
        ]);
    }
}
