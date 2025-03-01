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
            $table->foreignId('users_id')->constrained()->onDelete('cascade');
            $table->string('no_trans')->unique();
            $table->string('no_rm'); // Ubah tipe ke string agar cocok dengan pasiens.no_rm
            $table->foreign('no_rm')->references('no_rm')->on('pasiens')->onDelete('cascade');
            $table->index('no_rm'); // Tambahkan index untuk mempercepat pencarian berdasarkan no_rm

            $table->text('data_subjektif');
            $table->text('data_objektif');
            $table->string('td');
            $table->decimal('nadi', 5, 2);
            $table->decimal('rr', 5, 2);
            $table->decimal('suhu', 5, 2);
            $table->decimal('bb', 5, 2);
            $table->decimal('tb', 5, 2);
            $table->decimal('imt', 5, 2);
            $table->string('dx_1');
            $table->string('dx_2')->nullable();
            $table->string('alergi_obat')->nullable();
            $table->string('alergi_makanan')->nullable();
            $table->text('riwayat_penyakit_dahulu')->nullable();
            $table->text('riwayat_penyakit_keluarga')->nullable();
            $table->text('riwayat_penyakit_sekarang')->nullable();
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
