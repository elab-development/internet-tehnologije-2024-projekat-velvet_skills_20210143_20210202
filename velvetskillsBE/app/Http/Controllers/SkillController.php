<?php

namespace App\Http\Controllers;

use App\Http\Resources\SkillResource;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    /**
     * Prikazuje sve neselektovane veštine za korisnika sa rolom 'user'
     */
    public function unselectedSkills(Request $request)
    {
        $user = auth()->user();

        if (!$user || $user->role !== 'user') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Dohvati ID-jeve veština koje korisnik već ima
        $selectedSkillIds = $user->skills()->pluck('skills.id')->toArray();

        // Vrati veštine koje korisnik još nije selektovao
        $unselectedSkills = Skill::whereNotIn('id', $selectedSkillIds)->get();

        return SkillResource::collection($unselectedSkills);
    }
}
