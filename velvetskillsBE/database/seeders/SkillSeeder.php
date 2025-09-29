<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Skill;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $skills = [
            ['name' => 'Laravel',     'category' => 'Tehnička', 'description' => 'PHP framework za razvoj web aplikacija.'],
            ['name' => 'PHP',         'category' => 'Tehnička', 'description' => 'Serverski programski jezik za dinamične sajtove.'],
            ['name' => 'JavaScript',  'category' => 'Tehnička', 'description' => 'Jezik za interaktivnost u web aplikacijama.'],
            ['name' => 'React',       'category' => 'Tehnička', 'description' => 'JavaScript biblioteka za izgradnju korisničkog interfejsa.'],
            ['name' => 'SQL',         'category' => 'Tehnička', 'description' => 'Jezik za upite nad relacionim bazama podataka.'],
            ['name' => 'HTML',        'category' => 'Tehnička', 'description' => 'Označni jezik za strukturu web stranica.'],
            ['name' => 'CSS',         'category' => 'Tehnička', 'description' => 'Stilizovanje i raspored HTML elemenata.'],
            ['name' => 'Git',         'category' => 'Tehnička', 'description' => 'Sistem za verzionisanje koda.'],
            ['name' => 'REST API',    'category' => 'Tehnička', 'description' => 'Standard za razmenu podataka između klijenta i servera.'],
            ['name' => 'Docker',      'category' => 'Tehnička', 'description' => 'Alat za kontejnerizaciju aplikacija.'],
            ['name' => 'Vue.js',      'category' => 'Tehnička', 'description' => 'Progressive JS framework za interfejse.'],
            ['name' => 'MySQL',       'category' => 'Tehnička', 'description' => 'Relaciona baza podataka.'],
            ['name' => 'Python',      'category' => 'Tehnička', 'description' => 'Višenamenski programski jezik.'],
            ['name' => 'Excel',       'category' => 'Biznis',   'description' => 'Alat za tabelarne kalkulacije i analizu podataka.'],
            ['name' => 'WordPress',   'category' => 'Tehnička', 'description' => 'CMS sistem za izradu sajtova.'],
            ['name' => 'Scrum',       'category' => 'Biznis',   'description' => 'Agilna metodologija za upravljanje timovima.'],
            ['name' => 'UML',         'category' => 'Biznis',   'description' => 'Grafički jezik za modelovanje softverskih sistema.'],
            ['name' => 'Power BI',    'category' => 'Biznis',   'description' => 'Alat za vizualizaciju i analizu podataka.'],
            ['name' => 'Figma',       'category' => 'Soft',     'description' => 'Alat za dizajn korisničkih interfejsa.'],
            ['name' => 'Communication', 'category' => 'Soft',   'description' => 'Veština jasnog prenošenja informacija.'],
        ];

         foreach ($skills as $skill) {
            Skill::create($skill);
        }
    }
}
