<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\UserSkillsExport;

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

    public function exportSkills()
    {
        $user = auth()->user();

        if (!$user || $user->role !== 'user') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $fileName = 'user_skills_' . $user->id . '.xlsx';

        return Excel::download(new UserSkillsExport($user), $fileName);
    }
}
