<?php

// namespace App\Http\Controllers;

// use App\Models\Gift;
// use Illuminate\Http\Request;
// use Inertia\Inertia;

// class GiftController extends Controller {
//     // Pour frontend : Liste cadeaux disponibles
//     public function index() {
//         $gifts = Gift::where('reserved', false)->get();
//         return Inertia::render('Gifts/ListGift', ['gifts' => $gifts]);
//     }

//     // Pour sélection cadeau
//     public function reserve(Request $request, $id) {
//         $gift = Gift::findOrFail($id);
//         if ($gift->reserved) {
//             return response()->json(['error' => 'Gift already reserved'], 409);
//         }
//         $gift->update(['reserved' => true, 'reserved_by' => auth()->id()]);
//         return response()->json(['success' => true]);
//     }

//     // Pour admin : Liste tous cadeaux réservés
//     public function admin() {
//         $this->authorize('admin'); // Assumant middleware ou policy pour admin
//         $reservedGifts = Gift::where('reserved', true)->with('user')->get(); // Assumant relation user
//         return Inertia::render('Admin/Gifts', ['reservedGifts' => $reservedGifts]);
//     }


//     public function adminIndex() {
//         $gifts = Gift::with('user')->get(); // Inclut reserved_by si relation définie
//         return Inertia::render('Admin/Gifts/Index', ['gifts' => $gifts]);
//     }

//     // Admin : Créer cadeau
//     public function adminStore(Request $request) {
//         $validated = $request->validate([
//             'name' => 'required|string|max:255',
//         ]);
//         $gift = Gift::create($validated);
//         return redirect()->route('admin.gifts.index')->with('success', 'Cadeau ajouté.');
//     }

//     // Admin : Modifier cadeau
//     public function adminUpdate(Request $request, $id) {
//         $gift = Gift::findOrFail($id);
//         $validated = $request->validate([
//             'name' => 'required|string|max:255',
//             'reserved' => 'boolean', // Optionnel, pour forcer un statut
//         ]);
//         $gift->update($validated);
//         return redirect()->route('admin.gifts.index')->with('success', 'Cadeau modifié.');
//     }

//     // Admin : Supprimer cadeau
//     public function adminDestroy($id) {
//         $gift = Gift::findOrFail($id);
//         $gift->delete();
//         return redirect()->route('admin.gifts.index')->with('success', 'Cadeau supprimé.');
//     }
// }



namespace App\Http\Controllers;

use App\Models\Gift;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GiftController extends Controller {

   public function index()
{
    $gifts = Gift::where('reserved', false)->get();

    if ($gifts->isEmpty()) {
        \Log::warning('Aucun cadeau disponible ! Table vide ?');
    }

    logger()->info('Envoi des cadeaux à Inertia', [
        'count' => $gifts->count(),
        'premiers' => $gifts->take(3)->toArray()
    ]);

    return Inertia::render('Gifts/ListGift', [
        'gifts' => $gifts
    ]);
}

    public function reserve(Request $request, $id) {
        $gift = Gift::findOrFail($id);
        if ($gift->reserved) {
            return response()->json(['error' => 'Gift already reserved'], 409);
        }
        $gift->update(['reserved' => true, 'reserved_by' => auth()->id()]);
         return back()->with('success', 'Cadeau réservé avec succès');
    }

    // Pour admin : Liste tous cadeaux réservés
    public function admin() {
        $this->authorize('admin'); // Assumant middleware ou policy pour admin
        $reservedGifts = Gift::where('reserved', true)->with('user')->get(); // Assumant relation user
        return Inertia::render('Admin/Gifts', ['reservedGifts' => $reservedGifts]);
    }

public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
    ]);

    Gift::create([
        'name' => $validated['name'],
        'reserved' => false,
    ]);

    return back();
}

public function update(Request $request, Gift $gift)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
    ]);

    $gift->update($validated);

    return back();
}

public function gift(){
    return Inertia::render('Dashboard', [
    'gifts' => Gift::with('people')->latest()->get()
]);
}
public function destroy(Gift $gift)
{
    $gift->delete();

    return back();
}
}
