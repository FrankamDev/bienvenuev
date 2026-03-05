<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cadeau extends Model
{
    protected $fillable = ['name', 'reserved', 'reserved_by', 'version'];

    protected $casts = [
        'is_reserved' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'reserved_by');
    }
}
