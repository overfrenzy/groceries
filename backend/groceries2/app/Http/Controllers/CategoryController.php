<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Fetch all categories
    public function index()
    {
        $categories = Category::all()->map(function($category) {
            if ($category->icon) {
                $category->icon = url('storage/' . $category->icon);
            }
            return $category;
        });

        return response()->json($categories);
    }
}
