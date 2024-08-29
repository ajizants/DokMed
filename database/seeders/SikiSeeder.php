<?php

namespace Database\Seeders;

use App\Models\Siki;
use Illuminate\Database\Seeder;

class SikiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Siki::factory()->count(30)->create();
    }
}
