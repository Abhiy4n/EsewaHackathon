<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GameAttemptController;
use App\Models\GameAttempt;
use App\Models\Scoreboard;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Users/Homepage');
});

Route::get('/dashboard', function (Request $request) {
    $scoreboard = Scoreboard::where('user_id', $request->user()->id)->first();
    $testsPassedByUser = GameAttempt::where('user_id', $request->user()->id)
        ->where('won', true)
        ->count();

    return Inertia::render('Users/Dashboard', [
        'scoreboard' => $scoreboard ? [
            'points' => $scoreboard->points,
            'accuracy_rate' => $scoreboard->accuracy_rate,
            'rank_tier' => $scoreboard->rank_tier,
            'tests_passed' => $testsPassedByUser,
        ] : null,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/game-attempts', [GameAttemptController::class, 'store'])->name('game-attempts.store');
    Route::get('/fraud-awareness', function (Request $request) {
        $scoreboard = Scoreboard::where('user_id', $request->user()->id)->first();

        $completedAttempts = GameAttempt::where('user_id', $request->user()->id)
            ->with('game:id,slug')
            ->get()
            ->filter(fn($a) => $a->game !== null)
            ->mapWithKeys(fn($a) => [
                $a->game->slug => [
                    'won' => (bool) $a->won,
                    'status' => $a->status,
                ],
            ]);

        return Inertia::render('Users/FraudAwareness', [
            'scoreboard' => $scoreboard ? [
                'points' => $scoreboard->points,
                'accuracy_rate' => $scoreboard->accuracy_rate,
                'rank_tier' => $scoreboard->rank_tier,
            ] : null,
            'completedAttempts' => $completedAttempts,
        ]);
    })->name('fraud-awareness');
    Route::get('/qrCheck', function () {
        return Inertia::render('Users/qrCheck');
    })->name('qr-check');
    Route::get('/rewards', function (Request $request) {
        $user       = $request->user();
        $scoreboard = Scoreboard::where('user_id', $user->id)->first();
        $points     = $scoreboard?->points ?? 0;

        $parts    = explode(' ', trim($user->name));
        $initials = strtoupper(substr($parts[0], 0, 1) . (isset($parts[1]) ? substr($parts[1], 0, 1) : ''));

        $rewardTier = match (true) {
            $points >= 30000 => 'Platinum',
            $points >= 15000 => 'Gold',
            $points >= 5000  => 'Silver',
            default          => 'Bronze',
        };

        return Inertia::render('Users/rewards', [
            'userPoints'   => $points,
            'userName'     => $user->name,
            'userInitials' => $initials ?: 'U',
            'userRankTier' => $rewardTier,
        ]);
    })->name('rewards');

    Route::get('/leaderboard', function (Request $request) {
        $rankings = Scoreboard::query()
            ->with('user')
            ->orderByDesc('points')
            ->orderBy('updated_at')
            ->get();

        $testsPassedByUser = GameAttempt::where('won', true)
            ->selectRaw('user_id, count(*) as tests_passed')
            ->groupBy('user_id')
            ->get()
            ->keyBy('user_id');

        $leaders = $rankings
            ->take(10)
            ->values()
            ->map(function ($entry, $index) use ($testsPassedByUser) {
                return [
                    'rank' => $index + 1,
                    'user_id' => $entry->user_id,
                    'name' => $entry->user?->name ?? 'Unknown User',
                    'email' => $entry->user?->email ?? '—',
                    'points' => $entry->points,
                    'accuracy_rate' => $entry->accuracy_rate,
                    'time_taken' => $entry->time_taken,
                    'rank_tier' => $entry->rank_tier,
                    'tests_passed' => (int) ($testsPassedByUser[$entry->user_id]->tests_passed ?? 0),
                ];
            });

        $currentUserStanding = $rankings
            ->values()
            ->first(function ($entry) use ($request) {
                return (int) $entry->user_id === (int) $request->user()->id;
            });

        return Inertia::render('Users/leaderboard', [
            'leaders' => $leaders,
            'currentUserStanding' => $currentUserStanding ? [
                'rank' => $rankings->search(fn ($entry) => (int) $entry->user_id === (int) $request->user()->id) + 1,
                'points' => $currentUserStanding->points,
                'accuracy_rate' => $currentUserStanding->accuracy_rate,
                'rank_tier' => $currentUserStanding->rank_tier,
                'tests_passed' => (int) ($testsPassedByUser[$currentUserStanding->user_id]->tests_passed ?? 0),
            ] : null,
        ]);
    })->name('leaderboard');
});
Route::get("/send-money", function() {
    return Inertia::render("Users/sendmoney");
})->name("send-money");

require __DIR__.'/auth.php';
