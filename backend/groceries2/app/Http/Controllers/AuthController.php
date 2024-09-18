<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    // Register a new user and return a JWT token as a cookie
    public function register(Request $request)
    {
        try {
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

            // Check if we are in a local environment
            $isLocal = config('app.env') === 'local';
            $sameSite = $isLocal ? 'Lax' : 'None';
            $secure = !$isLocal;

            return response()->json(['success' => true, 'user' => $user])
                ->cookie('jwt_token', $token, 60 * 24, '/', null, false, true, 'Lax');
        } catch (\Exception $e) {
            Log::error('Error during user registration', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Registration failed.'], 500);
        }
    }

    // Login a user and return a JWT token as a cookie
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $remember = $request->get('remember', false);
        $token_ttl = $remember ? (60 * 24 * 7) : 60; // 7 days or 1 hour

        JWTAuth::factory()->setTTL($token_ttl);

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Credentials dont match'], 401);
        }

        return response()->json(['success' => true, 'user' => auth()->user()])
            ->cookie('jwt_token', $token, $token_ttl, '/', null, false, true, 'Lax');
    }

    // Logout the user and invalidate the JWT token
    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            Log::info('User logged out, token invalidated');

            return response()->json(['success' => true])
                ->cookie('jwt_token', '', -1, '/', null, false, true); // Remove the token cookie
        } catch (\Exception $exception) {
            Log::error('Error during logout', ['error' => $exception->getMessage()]);
            return response()->json(['error' => 'Could not invalidate token'], 500);
        }
    }

    // Fetch authenticated user (protected route)
    public function user()
    {
        try {
            // Log the incoming request
            Log::info('Request received on /user endpoint');
            
            // Check if token exists in the request
            $token = JWTAuth::getToken();
            if (!$token) {
                Log::error('JWT token not found in request');
                return response()->json(['message' => 'Token not provided.'], 401);
            }

            Log::info('Token found:', ['token' => $token]);

            // Authenticate the token
            $user = JWTAuth::authenticate($token);
            if (!$user) {
                Log::error('User authentication failed for token:', ['token' => $token]);
                return response()->json(['message' => 'Unauthenticated.'], 401);
            }

            Log::info('User authenticated successfully', ['userId' => $user->id]);

            return response()->json($user);
        } catch (\Exception $e) {
            Log::error('Error occurred during token authentication', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Error fetching user.'], 500);
        }
    }
}
