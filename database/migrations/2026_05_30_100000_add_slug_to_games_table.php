<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('games', function (Blueprint $table) {
            $table->string('slug')->nullable()->unique()->after('id');
        });

        $slugMap = [
            'Fake NGO / Donation' => 'ngo',
            'Electricity / Utility Bill' => 'electricity',
            'Matrimonial' => 'matrimonial',
            'Online Seller' => 'seller',
            'Police / Cyber Bureau Threat' => 'police',
            'Religious Donation' => 'religious',
            'Health & Medical' => 'health',
            'SIM Swap' => 'simswap',
            'Lottery' => 'lottery',
            'Scholarship' => 'scholarship',
            'Online Gaming' => 'gaming',
            'Loan App' => 'loan',
            'Wi-Fi / Free Internet' => 'wifi',
            'PAN / Nagarik App' => 'pan',
            'Foreign Employment' => 'foreignjob',
            'YouTube Monetization' => 'youtube',
        ];

        foreach ($slugMap as $title => $slug) {
            DB::table('games')
                ->where('title', $title)
                ->update(['slug' => $slug]);
        }
    }

    public function down(): void
    {
        Schema::table('games', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->dropColumn('slug');
        });
    }
};
