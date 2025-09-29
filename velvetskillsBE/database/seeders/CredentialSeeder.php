<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Credential;


class CredentialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $users = User::where('role', 'user')->get();

        foreach ($users as $user) {
            // Dohvati veštine koje korisnik već ima kroz pivot tabelu
            $userSkills = $user->userSkills()->with('skill')->get();

            foreach ($userSkills as $userSkill) {
                // 50% šansa da za ovu veštinu postoji credential
                if (fake()->boolean(50)) {
                    Credential::factory()->create([
                        'user_id'  => $user->id,
                        'skill_id' => $userSkill->skill_id,
                        'reviewed_by' => User::where('role', 'moderator')->inRandomOrder()->first()?->id,
                    ]);
                }
            }
        }
    }
}
