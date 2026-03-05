<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            // Non connecté → rediriger vers login
            return redirect()->route('login');
        }

        $user = Auth::user();

        // Vérifie si l'utilisateur a le rôle "admin"
        // Méthode 1 : champ simple "role" dans la table users
        if ($user->role !== 'admin') {
            abort(403, 'Accès réservé aux administrateurs.');
        }

        // Méthode 2 : si tu utilises un système plus avancé (ex: Spatie Permissions)
        // if (!$user->hasRole('admin')) {
        //     abort(403);
        // }

        // Ou méthode 3 : champ boolean is_admin
        // if (!$user->is_admin) {
        //     abort(403);
        // }

        return $next($request);
    }
}