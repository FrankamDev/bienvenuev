<?php

namespace App\Models;

use Illuminate\Database\Eloquent\OptimisticLocking;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Gift extends Model
{
    // use OptimisticLocking;
    use HasFactory;
    protected $fillable = ['name',
    'reserved',
    'reserved_by',
    'person_id',
    'version'];

    protected $casts = [
        'is_reserved' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'reserved_by');
    }
    public function person()
{
    return $this->belongsTo(Person::class);
}
}
