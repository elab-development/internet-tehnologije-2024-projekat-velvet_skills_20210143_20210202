<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      // Ručno kreirani korisnici
        User::create([
            'name'     => 'Anastasija Djordjevic',
            'email'    => 'anastasija.djordjevic@gmail.com',
            'password' => Hash::make('anastasijadjo'),
            'role'     => 'user',
            'bio'      => 'Studentkinja FONa.',
        ]);

        User::create([
            'name'     => 'Marko Moderator',
            'email'    => 'marko.moderator@gmail.com',
            'password' => Hash::make('moderator'),
            'role'     => 'moderator',
            'bio'      => 'Zadužen za odobravanje veština i sertifikata.',
        ]);

        User::create([
            'name'     => 'Admin Adminovic',
            'email'    => 'admin@gmail.com',
            'password' => Hash::make('admin'),
            'role'     => 'admin',
            'bio'      => 'Glavni administrator sistema.',
        ]);  

        // Random 3 korisnika sa factory-em (samo role=user)
        User::factory()->count(3)->create([
            'role' => 'user',
        ]);
    }
}
