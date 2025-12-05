<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiLoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        $user = Auth::user();

            if (!$user->hasVerifiedEmail()) {

                $user->sendEmailVerificationNotification();

            return response()->json([
                'message' => 'Debes verificar tu correo antes de iniciar sesión.',
                'status' => 'verification-link-sent'
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'status' => $user->hasVerifiedEmail() ? 'already-verified' : 'verification-link-sent'
        ]);
    }
}