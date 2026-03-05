<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\GiftController;

// Page d'accueil → affiche les cadeaux
Route::get('/', [HomeController::class, 'index'])->name('home');

// Route pour réserver un cadeau (appel AJAX depuis la home)
Route::post('/gifts/{id}/reserve', [GiftController::class, 'reserve'])
    ->name('gifts.reserve')
    ->middleware('auth');  // ← recommandé : seul un utilisateur connecté peut réserver

// Optionnel : page admin (garde-la si tu en as besoin)
Route::get('/admin/gifts', [GiftController::class, 'admin'])
    ->name('admin.gifts')
    ->middleware('admin');

// Tu peux commenter ou supprimer l'ancienne route /gifts si tu n'en veux plus
// Route::get('/gifts', ...);

// Autres routes existantes...
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});
Route::middleware('admin')->prefix('admin/gifts')->group(function () {
    Route::get('/', [GiftController::class, 'adminIndex'])->name('admin.gifts.index');
    Route::post('/', [GiftController::class, 'adminStore'])->name('admin.gifts.store');
    Route::put('/{id}', [GiftController::class, 'adminUpdate'])->name('admin.gifts.update');
    Route::delete('/{id}', [GiftController::class, 'adminDestroy'])->name('admin.gifts.destroy');
});
require __DIR__.'/settings.php';