<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use App\Http\Middleware\CorsMiddleware;

Route::middleware([CorsMiddleware::class])->group(function () {
    Route::get('/api/categories', [CategoryController::class, 'index']);
    Route::get('/api/sliders', [SliderController::class, 'index']);
    Route::get('/api/products', [ProductController::class, 'index']);

    // preflight CORS requests
    Route::options('/api/{any}', function (Request $request) {
        return response()->json([], 200);
    })->where('any', '.*');
});
