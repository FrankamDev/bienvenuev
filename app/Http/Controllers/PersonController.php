<?php

namespace App\Http\Controllers;

use App\Models\Gift;
use App\Models\Person;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:people,email',
            'gift_id' => 'required|exists:gifts,id',
        ]);

        // Vérifier si le cadeau est déjà réservé
        $gift = Gift::findOrFail($validated['gift_id']);

        if ($gift->reserved) {
            return back()->withErrors([
                'gift' => 'Ce cadeau est déjà réservé.'
            ]);
        }

        // Créer la personne
        $person = Person::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        // Lier le cadeau à la personne
        $gift = Gift::findOrFail($request->gift_id);
        $gift->update([
            'reserved' => true,
            'person_id' => $person->id,
        ]);

        return back()->with('success', 'Réservation réussie.');
    }
}
