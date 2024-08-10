<?php

namespace Database\Seeders;

use App\Models\Pasien;
use Illuminate\Database\Seeder;

class PasienSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // You can adjust the number as needed
        Pasien::factory()->count(30)->create();
    }
}
