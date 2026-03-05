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
        
              Schema::create('cadeaus', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('reserved')->default(false);
            $table->foreignId('reserved_by')->nullable()->constrained('users');
            $table->unsignedInteger('version')->default(0); // Pour optimistic locking
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cadeaus');
    }
};
