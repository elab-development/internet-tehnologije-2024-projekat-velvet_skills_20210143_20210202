<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserAuthController;

// AUTH ROUTES (public)

Route::post('register', [UserAuthController::class, 'register']);
Route::post('login', [UserAuthController::class, 'login']);


// PROTECTED ROUTES (require Sanctum token)
Route::middleware('auth:sanctum')->group(function () {

   Route::post('logout', [UserAuthController::class, 'logout']);
});
