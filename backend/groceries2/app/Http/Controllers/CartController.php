<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    // Get all items in the authenticated user's cart
    public function index()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $cartItems = Cart::where('user_id', $user->id)->with('products')->get();

        return response()->json($cartItems);
    }

    // Add a product to the cart
    public function store(Request $request)
    {
        $user = auth()->user();
        $productId = $request->input('product_id');
        $quantity = $request->input('quantity');
        $amount = $request->input('amount');

        // Create or update cart item for a single product
        $cartItem = Cart::updateOrCreate(
            ['user_id' => $user->id, 'product_id' => $productId],
            ['quantity' => $quantity, 'amount' => $amount]
        );

        return response()->json(['success' => true, 'cartItem' => $cartItem]);
    }

    // Remove an item from the cart
    public function destroy($id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $cartItem = Cart::where('user_id', $user->id)->where('id', $id)->first();

        if ($cartItem) {
            $cartItem->delete();
            return response()->json(['success' => true, 'message' => 'Item removed']);
        }

        return response()->json(['error' => 'Item not found'], 404);
    }
}
