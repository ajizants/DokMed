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
        Schema::create('soap_perawats', function (Blueprint $table) {
            $table->id();
            $table->string('subjektif');
            $table->string('objektif');
            $table->string('dx_keperawatan');
            $table->string('tindak_lanjut');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('soap_perawats');
    }
};
