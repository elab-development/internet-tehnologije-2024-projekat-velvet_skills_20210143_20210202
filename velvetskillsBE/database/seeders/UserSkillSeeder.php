<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Skill;
use App\Models\UserSkill;


class UserSkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::where('role', 'user')->get();
        $skills = Skill::all();

        foreach ($users as $user) {
            // Koliko veština dodeljujemo ovom korisniku (npr. 3 do 6)
            $assignedSkills = $skills->random(rand(3, 6));

            foreach ($assignedSkills as $skill) {
                UserSkill::factory()->create([
                    'user_id'  => $user->id,
                    'skill_id' => $skill->id,
                ]);
            }
        }
    }
}
