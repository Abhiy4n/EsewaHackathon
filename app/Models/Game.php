<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Game extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'description',
        'points_awarded',
    ];

    public function attempts(): HasMany
    {
        return $this->hasMany(GameAttempt::class);
    }
}
