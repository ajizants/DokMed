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
        Schema::create('pendaftarans', function (Blueprint $table) {
            $table->id(); // Primary key (sudah otomatis indexed)
            $table->string('no_antri');
            $table->string('no_trans')->unique(); // Unique index untuk memastikan tidak ada duplikasi
            $table->string('no_rm');
            $table->foreign('no_rm')->references('no_rm')->on('pasiens')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            // Menambahkan index untuk mempercepat pencarian
            $table->index('no_rm');
            $table->index('user_id');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pendaftarans');
    }
};
