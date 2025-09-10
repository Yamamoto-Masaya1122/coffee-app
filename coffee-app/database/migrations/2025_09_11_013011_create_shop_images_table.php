<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shop_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constraind('shops');
            $table->string('file_name'); //画像のファイル名
            $table->string('file_path'); //画像のパス
            $table->string('file_type'); //画像のタイプ
            $table->string('file_size'); //画像のサイズ
            $table->string('file_extension'); //画像の拡張子
            $table->string('file_mime'); //画像のMIMEタイプ
            $table->string('file_original_name'); //画像のオリジナルファイル名
            $table->string('file_original_path'); //画像のオリジナルパス
            $table->unsignedBigInteger('thumbnail_id')->nullable();
            $table->foreign('thumbnail_id')->references('id')->on('shop_images');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shop_images');
    }
};
