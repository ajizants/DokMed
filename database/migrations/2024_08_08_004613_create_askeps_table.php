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
        Schema::create('askeps', function (Blueprint $table) {
            $table->id();
            $table->string('no_trans')->unique();
            $table->foreignId('no_rm')->constrained();
            $table->string('data_subjektif');
            $table->string('data_objektif');
            $table->string('td');
            $table->decimal('nadi');
            $table->decimal('rr');
            $table->decimal('suhu');
            $table->decimal('bb');
            $table->decimal('tb');
            $table->decimal('imt');
            $table->string('dx_1');
            $table->string('dx_2');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('askeps');
    }
};
