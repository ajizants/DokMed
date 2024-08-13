<?php

namespace Database\Seeders;

use App\Models\Sdki;
use Illuminate\Database\Seeder;

class SdkiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Sdki::factory()->count(30)->create();

    }
}
