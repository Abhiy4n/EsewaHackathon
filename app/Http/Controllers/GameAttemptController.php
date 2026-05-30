<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameAttempt;
use App\Models\Scoreboard;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class GameAttemptController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'game_id' => ['nullable', 'integer', 'required_without:game_slug', 'exists:games,id'],
            'game_slug' => ['nullable', 'string', 'required_without:game_id'],
            'game_title' => ['nullable', 'string', 'max:255'],
            'game_description' => ['nullable', 'string'],
            'status' => ['nullable', 'string', 'in:started,completed,won,lost,skipped'],
            'won' => ['nullable', 'boolean'],
            'score' => ['nullable', 'integer', 'min:0'],
            'max_score' => ['nullable', 'integer', 'min:0'],
            'metadata' => ['nullable', 'array'],
            'started_at' => ['nullable', 'date'],
            'completed_at' => ['nullable', 'date', 'after_or_equal:started_at'],
        ]);

        $game = null;

        if (! empty($validated['game_id'])) {
            $game = Game::query()->findOrFail($validated['game_id']);
        } elseif (! empty($validated['game_slug'])) {
            $game = Game::query()->firstOrCreate(
                ['slug' => $validated['game_slug']],
                [
                    'title' => $validated['game_title'] ?? Str::headline(str_replace(['-', '_'], ' ', $validated['game_slug'])),
                    'description' => $validated['game_description'] ?? null,
                    'points_awarded' => 15,
                ]
            );

            if ($game->points_awarded === 0) {
                $game->update(['points_awarded' => 15]);
            }
        }

        $won = (bool) ($validated['won'] ?? false);
        $status = $validated['status'] ?? ($won ? 'won' : 'completed');

        $attempt = GameAttempt::create([
            'user_id' => $request->user()->id,
            'game_id' => $game->id,
            'status' => $status,
            'won' => $won,
            'score' => $validated['score'] ?? 0,
            'max_score' => $validated['max_score'] ?? 0,
            'metadata' => $validated['metadata'] ?? null,
            'started_at' => $validated['started_at'] ?? now(),
            'completed_at' => $validated['completed_at'] ?? now(),
        ]);

        $scoreboard = Scoreboard::firstOrCreate(
            ['user_id' => $request->user()->id],
            [
                'points' => 0,
                'accuracy_rate' => 0,
                'time_taken' => 0,
                'rank_tier' => 'Vulnerable',
            ]
        );

        if ($won) {
            $scoreboard->points += (int) $game->points_awarded;
        }

        $attemptCount = GameAttempt::query()
            ->where('user_id', $request->user()->id)
            ->count();
        $wonCount = GameAttempt::query()
            ->where('user_id', $request->user()->id)
            ->where('won', true)
            ->count();

        $scoreboard->accuracy_rate = $attemptCount > 0
            ? (int) round(($wonCount / $attemptCount) * 100)
            : 0;

        $startedAt = Carbon::parse($attempt->started_at);
        $completedAt = Carbon::parse($attempt->completed_at);
        $scoreboard->time_taken += max(0, $startedAt->diffInSeconds($completedAt));
        $scoreboard->rank_tier = match (true) {
            $scoreboard->points >= 800 => 'Guardian',
            $scoreboard->points >= 500 => 'Shielded',
            $scoreboard->points >= 200 => 'Aware',
            default => 'Vulnerable',
        };
        $scoreboard->save();

        return response()->json([
            'message' => 'Attempt recorded.',
            'attempt' => $attempt->load(['game']),
        ], 201);
    }
}
