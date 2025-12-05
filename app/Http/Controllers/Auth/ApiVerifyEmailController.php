<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use App\Models\User;

use Illuminate\Http\RedirectResponse;

class ApiVerifyEmailController extends Controller
{
    public function __invoke(Request $request, $id, $hash): RedirectResponse
    {
        $user = User::find($id);

        if (! $user) {
            return redirect('http://localhost:3000?status=user-not-found');
        }

        if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return redirect('http://localhost:3000?status=invalid-hash');
        }

        if ($user->hasVerifiedEmail()) {
            return redirect('http://localhost:3000?status=already-verified');
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return redirect('http://localhost:3000?status=email-verified');
    }
}
