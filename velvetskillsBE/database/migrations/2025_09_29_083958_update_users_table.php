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
        Schema::table('users', function (Blueprint $table) {
            // Dodavanje dodatnih kolona van defaultnog modela
            $table->string('role')->default('user');
            $table->text('bio')->nullable();

            // Brisanje kolona koje necemo koristiti
            $table->dropColumn(['remember_token', 'email_verified_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Vraćanje prethodnih kolona
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();

            // Uklanjanje dodatih
            $table->dropColumn(['role', 'bio']);
        });
    }
};
