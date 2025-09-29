<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\SkillSeeder;
use Database\Seeders\UserSkillSeeder;
use Database\Seeders\CredentialSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         $this->call([
        UserSeeder::class,        // Prvo korisnici
        SkillSeeder::class,       // Zatim veštine (katalog)
        UserSkillSeeder::class,   // Zatim pivot veza user ↔ skill
        CredentialSeeder::class,  //  I na kraju credentiali za te veštine
    ]);
    }
}
