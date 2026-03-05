<?php

namespace App\Http\Controllers;

use App\Models\Gift;
use Illuminate\Http\Request;
use Inertia\Inertia;
class HomeController extends Controller
{
    public function index(){
        $gifts = Gift::where('reserved', false)
            ->get(['id', 'name']);
        return Inertia::render("Home/HomeIndex", [
'gifts' => $gifts,
'bb' => 'je taime'
        ]);
    }
}
