<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItemList;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function createOrder(Request $request)
    {
        $user = auth()->user();
        $cartItems = Cart::where('user_id', $user->id)->with('product')->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['error' => 'Cart is empty'], 400);
        }

        // Calculate total order amount
        $totalOrderAmount = $cartItems->sum(function($cartItem) {
            return $cartItem->quantity * $cartItem->product->mrp;
        });

        // Create new order
        $order = Order::create([
            'username' => $request->username,
            'email' => $request->email,
            'phone' => $request->phone,
            'zip' => $request->zip,
            'address' => $request->address,
            'totalOrderAmount' => $request->totalOrderAmount,
            'user_id' => $user->id,
            'paymentId' => Str::uuid(),
        ]);
        
        // Create order items
        foreach ($cartItems as $item) {
            OrderItemList::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->product->mrp,
            ]);
        }

        // Clear cart after order creation
        Cart::where('user_id', $user->id)->delete();

        return response()->json([
            'success' => true, 
            'order_id' => $order->id,
            'message' => 'Order created successfully'
        ]);
    }

    public function getOrderDetails($id)
    {
        $order = Order::with('items.product')->find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        return response()->json($order);
    }
}
