<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         // svaki korisnik može prijaviti svaku veštinu samo jednom
        Schema::table('user_skills', function (Blueprint $table) {
         $table->unique(['user_id', 'skill_id'], 'user_skill_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_skills', function (Blueprint $table) {
           
            $table->dropUnique('user_skill_unique');
    
        });
    }
};
