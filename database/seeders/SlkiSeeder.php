<?php

namespace Database\Seeders;

use App\Models\Slki;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SlkiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Slki::factory()->count(30)->create();
    }
}
