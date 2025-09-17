<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Shop;
use App\Http\Requests\StoreShopRequest;
use App\Http\Requests\UpdateShopRequest;
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
                    $shopImageModel->saveImage($image, $shop->id, $fileName, $extension);
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

    public function edit($id)
    {
        $shop = Shop::with('shopImages')->find($id);
        return Inertia::render('Shop/Edit', ['shop' => $shop]);
    }

    public function update(UpdateShopRequest $request)
    {
        $status = 'error';
        DB::beginTransaction();
        try {
            $shopModel = new Shop();
            $user = Auth::user();
            $shop = $shopModel->updateShop($request, $user);
            //既存の画像の削除
            $existingImages = $request->input('existingImages', []);
            if (!is_array($existingImages)) {
                $existingImages = [];
            }

            // 既存として残すIDの配列を作成
            $existingImageIds = array_values(array_filter(array_map(function ($row) {
                if (is_array($row) && isset($row['id'])) {
                    return (int) $row['id'];
                }
                if (is_object($row) && isset($row->id)) {
                    return (int) $row->id;
                }
                return null;
            }, $existingImages), fn($v) => $v !== null));

            // 店舗に紐づく全画像IDを取得
            $shopImageIds = ShopImage::where('shop_id', $shop->id)
                ->pluck('id')
                ->toArray();

            // 差分（削除対象ID）を算出
            $deleteImageIds = array_values(array_diff($shopImageIds, $existingImageIds));

            if (!empty($deleteImageIds)) {
                // 削除する画像のIDを指定して削除
                ShopImage::whereIn('id', $deleteImageIds)->delete();
            }
            //新規画像の保存
            if ($request->file('images')) {
                $images = $request->file('images');
                foreach ($images as $image) {
                    //画像の拡張子を取得
                    $extension = $image->getClientOriginalExtension();
                    //乱数を作成
                    $random = Random::generate(16);
                    //画像の名前を生成
                    $fileName = $shop->id . '_' . $random . '.' . $extension;
                    $shopImageModel = new ShopImage();
                    $shopImageModel->saveImage($image, $shop->id, $fileName, $extension);
                    //画像の保存
                    $image->storeAs('shop_images', $fileName);
                }
            }

            DB::commit();
            $status = 'shop-updated';
        } catch (\Exception $e) {
            //失敗した時の処理
            $message = $e->getMessage();
            Log::error($message);
            DB::rollBack();
            throw $e;
        }
        return redirect()->route('shop.detail', [
            'id' => $shop->id,
            'status' => $status,
        ]);
    }

    public function destroy($id)
    {
        $status = 'error';
        $shop = Shop::find($id);
        //トランザクションを開始
        DB::beginTransaction();
        try {
            // 店舗の削除
            $shop->delete();
            $shopImageIds = ShopImage::where('shop_id', $id)->get(['id']);
            // 店舗に紐づく画像の削除
            if ($shopImageIds->count() > 0) {
                DB::table('shop_images')->whereIn('id', $shopImageIds)->delete();
            }
            DB::commit();
        } catch (\Exception $e) {
            //失敗した時の処理
            $message = $e->getMessage();
            Log::error($message);
            DB::rollBack();
            throw $e;
        }

        $status = 'shop-deleted';
        return redirect()->route('shop.index', [
            'status' => $status,
        ]);
    }
}
