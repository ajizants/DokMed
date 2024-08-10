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
        Schema::create('asesmen_awals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pasiens_id')->constrained();
            $table->foreignId('users_id')->constrained();
            $table->string('riwayat_penyakit_sekarang');
            $table->string('riwayat_penyakit_dahulu');
            $table->string('riwayat_penyakit_keluarga');
            $table->string('dx_keperawatan');
            $table->string('tindakan');
            $table->string('obat');
            $table->string('tindak_lanjut');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asesmen_awals');
    }
};
