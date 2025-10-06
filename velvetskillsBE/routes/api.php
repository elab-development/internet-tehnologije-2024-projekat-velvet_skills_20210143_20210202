<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CredentialController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\UserSkillController;

// AUTH ROUTES (public)

Route::post('register', [UserAuthController::class, 'register']);
Route::post('login', [UserAuthController::class, 'login']);


// PROTECTED ROUTES (require Sanctum token)
Route::middleware('auth:sanctum')->group(function () {

   Route::post('logout', [UserAuthController::class, 'logout']);

   //admin rute
    Route::get('/admin/users', [AdminController::class, 'index']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'destroy']);

    //moderator rute
    Route::get('/moderator/credentials', [CredentialController::class, 'moderatorIndex']);
    Route::put('/moderator/credentials/{id}', [CredentialController::class, 'moderatorUpdateStatus']);


    //klasican korisnik rute
    Route::get('/profile', [UserController::class, 'profile']);
    Route::put('/profile', [UserController::class, 'updateProfile']);

    Route::get('/skills/unselected', [SkillController::class, 'unselectedSkills']);
    Route::get('/skills', [UserSkillController::class, 'mySkills']);
    Route::post('/skills/add', [UserSkillController::class, 'addSkillByName']);

});
