<?php

use App\Http\Controllers\Auth\ApiLoginController;
use App\Http\Controllers\Auth\ApiRegisterController;
use App\Http\Controllers\Auth\ApiEmailVerificationNotificationController;
use App\Http\Controllers\Auth\ApiVerifyEmailController;
use App\Http\Controllers\Auth\ApiPasswordResetLinkController;
use App\Http\Controllers\Auth\ApiNewPasswordController;

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::post('/login', [ApiLoginController::class, 'login']); 
Route::post('/register', [ApiRegisterController::class, 'register']);

Route::post('/email/verification-notification', [ApiEmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth:sanctum', 'throttle:6,1'])
    ->name('verification.send');

Route::get('/verify-email/{id}/{hash}', ApiVerifyEmailController::class)
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::post('/forgot-password', [ApiPasswordResetLinkController::class, 'store'])
    ->middleware('guest')
    ->name('password.email');

Route::post('/reset-password', [ApiNewPasswordController::class, 'store'])
    ->middleware('guest')
    ->name('password.update');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn (Request $request) => $request->user());

    Route::post('/logout', function (Request $request) {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logout exitoso']);
    });
});
