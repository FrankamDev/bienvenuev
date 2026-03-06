<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\GiftController;

use App\Models\Gift;
use App\Models\User;

use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Page d'accueil
|--------------------------------------------------------------------------
*/
Route::get('/', [HomeController::class, 'index'])->name('home');


/*
|--------------------------------------------------------------------------
| Réservation rapide (avec ou sans compte)
|--------------------------------------------------------------------------
*/

Route::post('/quick-reserve', function (Request $request) {

    if (auth()->check()) {

        $gift = Gift::findOrFail($request->gift_id);

        if ($gift->reserved) {
            return back()->withErrors(['gift' => 'Déjà réservé']);
        }

        $gift->update([
            'reserved' => true,
            'reserved_by' => auth()->id(),
        ]);

        return back()->with('success', 'Cadeau réservé avec succès ! Merci.');
    }

    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|min:8|confirmed',
        'gift_id' => 'required|exists:gifts,id',
    ]);

    $user = User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => Hash::make($validated['password']),
    ]);

    // connecter automatiquement l'utilisateur
    Auth::login($user);

    $gift = Gift::findOrFail($validated['gift_id']);

    if ($gift->reserved) {
        return back()->withErrors(['gift' => 'Déjà réservé entre-temps']);
    }

    $gift->update([
        'reserved' => true,
        'reserved_by' => $user->id,
    ]);

    return back()->with('success', 'Inscription terminée ! Le cadeau est réservé pour vous.');

})->name('quick.reserve');


/*
|--------------------------------------------------------------------------
| Réservation (utilisateur connecté)
|--------------------------------------------------------------------------
*/


Route::post('/gifts/{id}/reserve', [GiftController::class, 'reserve'])
    ->middleware('auth')
    ->name('gifts.reserve');


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

    return Inertia::render('dashboard');

})->middleware('auth')->name('dashboard');


require __DIR__.'/settings.php';