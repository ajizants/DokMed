<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Slki>
 */
class SlkiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kode_slki' => $this->faker->regexify('[a-zA-Z]\.\d{5}'),
            'nama_slki' => $this->faker->sentence,
            'definisi' => $this->faker->sentence,
            'ekspetasi' => $this->faker->sentence,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
