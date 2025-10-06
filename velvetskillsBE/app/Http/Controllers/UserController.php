<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Vrati podatke ulogovanog korisnika
     */
    public function profile()
    {
        $user = auth()->user();

        if ($user->role !== 'user') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return new UserResource($user);
    }

    /**
     * Ažuriraj podatke ulogovanog korisnika
     */
    public function updateProfile(Request $request)
    {
        $user = auth()->user();

        if ($user->role !== 'user') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'bio' => 'nullable|string|max:1000'
        ]);

        $user->update($validated);

        return new UserResource($user);
    }
}
