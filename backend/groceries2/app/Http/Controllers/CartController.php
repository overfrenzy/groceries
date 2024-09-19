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
        $user = auth()->user();
        $cartItems = Cart::where('user_id', $user->id)
            ->with('product:id,name,image,mrp') // Load specific fields from the product
            ->get();

        return response()->json($cartItems);
    }

    // Add a product to the cart
    public function store(Request $request)
    {
        $user = auth()->user();
        $productId = $request->input('product_id');
        $quantity = $request->input('quantity');
        $amount = $request->input('amount');

        // Check if the product already exists in the cart
        $cartItem = Cart::where('user_id', $user->id)
                        ->where('product_id', $productId)
                        ->first();

        if ($cartItem) {
            // Update quantity and amount by incrementing the existing values
            $cartItem->quantity += $quantity;
            $cartItem->amount = $cartItem->quantity * ($amount / $quantity); // Recalculate the total
            $cartItem->save();
        } else {
            // If the product does not exist in the cart, create a new entry
            $cartItem = Cart::create([
                'user_id' => $user->id,
                'product_id' => $productId,
                'quantity' => $quantity,
                'amount' => $amount,
            ]);
        }

        return response()->json(['success' => true, 'cartItem' => $cartItem]);
    }


    // Remove an item from the cart
    public function destroy($id)
    {
        $user = auth()->user();
        $cartItem = Cart::where('user_id', $user->id)->where('id', $id)->first();

        if ($cartItem) {
            $cartItem->delete();
            return response()->json(['success' => true, 'message' => 'Item removed']);
        }

        return response()->json(['error' => 'Item not found'], 404);
    }
}
