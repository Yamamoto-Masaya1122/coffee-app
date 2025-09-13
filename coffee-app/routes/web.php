<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\ReviewController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/sample', function () {
    return Inertia::render('Sample');
})->name('sample');

// 店舗関連
Route::get('/', [ShopController::class, 'index'])->name('shop.index');
Route::middleware('auth')->group(function () {
    Route::get('/shop/create', [ShopController::class, 'create'])->name('shop.create');
    Route::post('/shop/store', [ShopController::class, 'store'])->name('shop.store');
});
Route::get('/shop/{id}', [ShopController::class, 'detail'])->name('shop.detail');

// レビュー関連
Route::middleware('auth')->group(function () {
    Route::get('/review/create/shop/{id}', [ReviewController::class, 'create'])->name('review.create');
    Route::post('/review/store', [ReviewController::class, 'store'])->name('review.store');
    Route::get('/review/edit/{id}', [ReviewController::class, 'edit'])->name('review.edit');
    Route::post('/review/update', [ReviewController::class, 'update'])->name('review.update');
    Route::delete('/review/destroy/{id}', [ReviewController::class, 'destroy'])->name('review.destroy');
});

require __DIR__ . '/auth.php';
