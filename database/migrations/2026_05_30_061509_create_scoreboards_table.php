<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('scoreboards', function (Blueprint $table) {
        $table->id();
        
        // Connects to your existing users table
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        
        // Leaderboard stats
        $table->integer('points')->default(0); 
        $table->integer('accuracy_rate')->default(0); 
        $table->integer('time_taken')->default(0);    
        $table->string('rank_tier')->default('Vulnerable'); 
        
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scoreboards');
    }
};
