<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    // Register a new user and return a JWT token as a cookie
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(['success' => true, 'user' => $user])
            ->cookie('jwt_token', $token, 60 * 24, '/', null, true, true);
    }

    // Login a user and return a JWT token as a cookie
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json(['success' => true, 'user' => Auth::user()])
            ->cookie('jwt_token', $token, 60 * 24, '/', null, true, true);
    }

    // Fetch authenticated user (protected route)
    public function user()
    {
        return response()->json(Auth::user());
    }
}
