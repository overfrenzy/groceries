<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Fetch all products
    public function index()
    {
        $products = Product::all()->map(function($product) {
            if ($product->image) {
                $product->image = url('storage/' . $product->image);
            }
            return $product;
        });

        return response()->json($products);
    }
}