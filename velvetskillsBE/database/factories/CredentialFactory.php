<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Skill;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Credential>
 */
class CredentialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'     => User::factory(),
            'skill_id'    => Skill::factory(), // uvek postoji skill
            'type'        => $this->faker->randomElement(['diploma', 'sertifikat', 'licenca', 'ostalo']),
            'title'       => $this->faker->words(3, true),
            'issue_date'  => $this->faker->date(),
            'expiry_date' => $this->faker->boolean(40) ? $this->faker->dateTimeBetween('+1 year', '+3 years') : null,
            'file'        => $this->faker->imageUrl(600, 400, 'business', true, 'sertifikat'), // primer slike
            'status'      => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'reviewed_by' => User::factory(),
        ];
    }
}
