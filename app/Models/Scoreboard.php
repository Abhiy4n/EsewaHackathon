<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Scoreboard extends Model
{
    protected $fillable = [
        'user_id',
        'points',
        'accuracy_rate',
        'time_taken',
        'rank_tier',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
