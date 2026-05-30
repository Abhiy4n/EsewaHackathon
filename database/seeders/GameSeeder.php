<?php

namespace Database\Seeders;

use App\Models\Game;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    public function run(): void
    {
        $games = [
            ['slug' => 'ngo', 'title' => 'Fake NGO / Donation', 'description' => 'Donation fraud simulation', 'points_awarded' => 100],
            ['slug' => 'electricity', 'title' => 'Electricity / Utility Bill', 'description' => 'Utility impersonation simulation', 'points_awarded' => 100],
            ['slug' => 'matrimonial', 'title' => 'Matrimonial', 'description' => 'Romance scam simulation', 'points_awarded' => 100],
            ['slug' => 'seller', 'title' => 'Online Seller', 'description' => 'Advance payment fraud simulation', 'points_awarded' => 100],
            ['slug' => 'police', 'title' => 'Police / Cyber Bureau Threat', 'description' => 'Impersonation threat simulation', 'points_awarded' => 100],
            ['slug' => 'religious', 'title' => 'Religious Donation', 'description' => 'Emotional manipulation simulation', 'points_awarded' => 100],
            ['slug' => 'health', 'title' => 'Health & Medical', 'description' => 'Healthcare fraud simulation', 'points_awarded' => 100],
            ['slug' => 'simswap', 'title' => 'SIM Swap', 'description' => 'Account takeover simulation', 'points_awarded' => 100],
            ['slug' => 'lottery', 'title' => 'Lottery', 'description' => 'Prize fraud simulation', 'points_awarded' => 100],
            ['slug' => 'scholarship', 'title' => 'Scholarship', 'description' => 'Education fraud simulation', 'points_awarded' => 100],
            ['slug' => 'gaming', 'title' => 'Online Gaming', 'description' => 'Financial trap simulation', 'points_awarded' => 100],
            ['slug' => 'loan', 'title' => 'Loan App', 'description' => 'Data and money theft simulation', 'points_awarded' => 100],
            ['slug' => 'wifi', 'title' => 'Wi-Fi / Free Internet', 'description' => 'Data interception simulation', 'points_awarded' => 100],
            ['slug' => 'pan', 'title' => 'PAN / Nagarik App', 'description' => 'Identity theft simulation', 'points_awarded' => 100],
            ['slug' => 'foreignjob', 'title' => 'Foreign Employment', 'description' => 'Fake agency fraud simulation', 'points_awarded' => 100],
            ['slug' => 'youtube', 'title' => 'YouTube Monetization', 'description' => 'Creator fraud simulation', 'points_awarded' => 100],
        ];

        foreach ($games as $game) {
            Game::query()->updateOrCreate(
                ['slug' => $game['slug']],
                $game
            );
        }
    }
}
