<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Contracts\View\View;
use App\Models\User;

class UserSkillsExport implements FromView
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function view(): View
    {
        $skills = $this->user->userSkills()->with('skill')->get();
        $credentials = $this->user->credentials()->with('skill')->get();

        return view('exports.users_skills', [
            'user' => $this->user,
            'skills' => $skills,
            'credentials' => $credentials,
        ]);
    }
}
