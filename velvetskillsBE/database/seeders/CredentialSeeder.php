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
        // Niz dostupnih slika za kredencijale
        $fileLinks = [
            "https://campus.w3schools.com/cdn/shop/files/202_700x700.png?v=1720962295",
            "https://soimlearningtocode.wordpress.com/wp-content/uploads/2015/08/certificate.jpg",
            "https://www.typecalendar.com/wp-content/uploads/2023/06/Word-Sample-Diploma-Template.jpg?gid=671",
            "https://www.typecalendar.com/wp-content/uploads/2023/02/Diploma.jpg",
            "https://data.templateroller.com/pdf_docs_html/2376/23762/2376294/diploma-certificate-template_big.png",
            "https://res.cloudinary.com/certifier/image/upload/v1718876081/completion_certificate_templates_Certifier_blog_stylish_758c35f7ac.jpg",
            "https://res.cloudinary.com/certifier/image/upload/v1748361450/20_3321387fcd.webp",
        ];

        $users = User::where('role', 'user')->get();

        foreach ($users as $user) {
            // Sve veštine koje korisnik ima
            $userSkills = $user->userSkills()->with('skill')->get();

            foreach ($userSkills as $userSkill) {
                // 50% šanse da dobije credential
                if (fake()->boolean(50)) {
                    Credential::factory()->create([
                        'user_id'     => $user->id,
                        'skill_id'    => $userSkill->skill_id,
                        'file'        => $fileLinks[array_rand($fileLinks)], //Nasumična slika
                        'reviewed_by' => User::where('role', 'moderator')
                            ->inRandomOrder()
                            ->first()?->id,
                    ]);
                }
            }
        }
    }
}
