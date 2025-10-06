<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserSkillResource;
use App\Models\Skill;
use App\Models\UserSkill;
use Illuminate\Http\Request;

class UserSkillController extends Controller
{
    /**
     * 11. Pregled mojih veština (ulogovani korisnik)
     */
    public function mySkills(Request $request)
    {
        $user = auth()->user();

        if (!$user || $user->role !== 'user') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $userSkills = $user->userSkills()->with(['skill'])->get();

        return UserSkillResource::collection($userSkills);
    }

    /**
     * 12. Dodavanje veštine iz liste po nazivu
     */
    public function addSkillByName(Request $request)
    {
        $request->validate([
            'skill_name' => 'required|string',
        ]);

        $user = auth()->user();

        if (!$user || $user->role !== 'user') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $skill = Skill::where('name', $request->skill_name)->first();

        if (!$skill) {
            return response()->json(['message' => 'Skill not found.'], 404);
        }

        // Proveri da li korisnik već ima tu veštinu
        $alreadyExists = $user->skills()->where('skill_id', $skill->id)->exists();

        if ($alreadyExists) {
            return response()->json(['message' => 'Skill already added.'], 409);
        }

        // Kreiraj novu vezu u pivot tabeli
        $user->skills()->attach($skill->id, [
            'level' => 1,
            'is_selected' => true,
            'status' => 'pending'
        ]);

        return response()->json(['message' => 'Skill added successfully.'], 201);
    }

    
}
