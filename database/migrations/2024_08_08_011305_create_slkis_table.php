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
        Schema::create('slkis', function (Blueprint $table) {
            $table->id();
            $table->string('kode_slki');
            $table->string('luaran');
            $table->string('definisi');
            $table->string('ekspetasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('slkis');
    }
};
