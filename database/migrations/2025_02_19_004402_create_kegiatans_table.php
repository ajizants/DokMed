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
        Schema::create('kegiatans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade')->index(); // Index pada user_id
            $table->string('kegiatan');
            $table->date('tanggal');       // Tambahkan kolom tanggal
            $table->time('waktu_mulai');   // Tambahkan waktu mulai
            $table->time('waktu_selesai'); // Tambahkan waktu selesai
            $table->text('keterangan')->nullable();
            $table->timestamps();

            // Index untuk pencarian berdasarkan user_id dan rentang tanggal
            $table->index(['user_id', 'tanggal']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kegiatans');
    }
};
