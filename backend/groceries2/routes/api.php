<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\JwtMiddleware;

// Public routes (categories, sliders, products)
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/sliders', [SliderController::class, 'index']);
Route::get('/products', [ProductController::class, 'index']);

// Authentication routes (login, register)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (require JWT middleware for authentication)
Route::middleware([JwtMiddleware::class])->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Cart routes (requires user to be logged in)
    Route::post('/cart', [CartController::class, 'store']);
    Route::get('/cart', [CartController::class, 'index']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
});
