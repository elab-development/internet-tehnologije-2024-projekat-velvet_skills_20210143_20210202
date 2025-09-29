<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Skill;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserSkillFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id'     => User::factory(),
            'skill_id'    => Skill::factory(),
            'level'       => $this->faker->numberBetween(1, 5),
            'is_selected' => $this->faker->boolean(30),
            'status'      => $this->faker->randomElement(['pending', 'approved', 'rejected']),
        ];
    }
}
