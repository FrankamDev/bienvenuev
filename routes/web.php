<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\GiftController;
use Inertia\Inertia;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;

Route::post('/quick-register-and-reserve', [RegisteredUserController::class, 'quickRegisterAndReserve'])
    ->name('quick.register.reserve');
/*
|--------------------------------------------------------------------------
| Page d'accueil
|--------------------------------------------------------------------------
*/
Route::get('/', [HomeController::class, 'index'])->name('home');

/*
|--------------------------------------------------------------------------
| Réservation (utilisateur connecté)
|--------------------------------------------------------------------------
*/
Route::post('/gifts/{id}/reserve', [GiftController::class, 'reserve'])
    ->name('gifts.reserve')
    ->middleware('auth');

/*
|--------------------------------------------------------------------------
| Dashboard → ADMIN UNIQUEMENT
|--------------------------------------------------------------------------
*/
Route::get('/dashboard', function () {

    $user = auth()->user();

    if (!$user || $user->role !== 'admin') {
        abort(403, 'Accès refusé.');
    }

    return Inertia::render('Dashboard');

})->middleware('auth')->name('dashboard');

require __DIR__.'/settings.php';