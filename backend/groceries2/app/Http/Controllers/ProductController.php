<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $categoryId = $request->query('category_id');

        $query = Product::query();
        
        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        $products = $query->get()->map(function($product) {
            if ($product->image) {
                $product->image = url('storage/' . $product->image);
            }
            return $product;
        });

        return response()->json($products);
    }
}
