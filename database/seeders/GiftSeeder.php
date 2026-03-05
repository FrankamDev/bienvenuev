<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Gift;

class GiftSeeder extends Seeder
{
    public function run(): void
    {
        $gifts = [
            ['name' => 'Robot aspirateur'],
            ['name' => 'Machine à café Nespresso'],
            ['name' => 'Aspirateur sans fil Dyson'],
            ['name' => 'Ensemble valises cabine + soute'],
            ['name' => 'Appareil photo hybride Sony'],
            ['name' => 'Cafétière à piston + moulin'],
            ['name' => 'Ensemble couette + oreillers king size'],
            ['name' => 'Mixeur chauffant Moulinex'],
            ['name' => 'Blender chauffant haut de gamme'],
            ['name' => 'Friteuse sans huile XXL'],
        ];

        foreach ($gifts as $gift) {
            Gift::create($gift);
        }
    }
}
