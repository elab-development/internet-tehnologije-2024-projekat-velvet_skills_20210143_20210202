<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserSkillResource;
use App\Models\Skill;
use App\Models\UserSkill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserSkillController extends Controller
{
    /**
     *  Pregled mojih veština (ulogovani korisnik)
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
     * Dodavanje veštine iz liste po nazivu
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

    /**
     *  Azuriranje moje vestrine
     */
    public function updateUserSkill(Request $request, $userSkillId)
    {
        $user = auth()->user();

        if (!$user || $user->role !== 'user') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $userSkill = UserSkill::where('id', $userSkillId)
            ->where('user_id', $user->id)
            ->first();

        if (!$userSkill) {
            return response()->json(['message' => 'Skill not found for this user.'], 404);
        }

        $request->validate([
            'level'       => 'nullable|integer|min:1|max:5',
            'is_selected' => 'nullable|boolean'
        ]);

        $userSkill->update($request->only(['level', 'is_selected']));

        return response()->json(['message' => 'User skill updated successfully.']);
    }

    /**
     * Obriši dodatu veštinu iz svoje liste
     */
    public function deleteUserSkill($userSkillId)
    {
        $user = auth()->user();

        if (!$user || $user->role !== 'user') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $userSkill = UserSkill::where('id', $userSkillId)
            ->where('user_id', $user->id)
            ->first();

        if (!$userSkill) {
            return response()->json(['message' => 'Skill not found for this user.'], 404);
        }

        $userSkill->delete();

        return response()->json(['message' => 'User skill deleted successfully.']);
    }
}
