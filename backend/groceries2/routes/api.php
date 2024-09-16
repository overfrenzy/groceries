<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;

// Define API routes without CORS middleware

// Public routes (categories, sliders, products)
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/sliders', [SliderController::class, 'index']);
Route::get('/products', [ProductController::class, 'index']);

// Authentication routes (login, register)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (fetch user data)
Route::middleware('auth:api')->get('/user', [AuthController::class, 'user']);

// Throttle login route to prevent brute-force attacks
Route::middleware('throttle:10,1')->post('/login', [AuthController::class, 'login']);