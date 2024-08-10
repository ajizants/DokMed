<?php

namespace Database\Factories;

use App\Models\Pasien;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pasien>
 */
class PasienFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Pasien::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_user' => $this->faker->randomElement(['1', '2']),
            'nama' => $this->faker->name,
            'nik' => $this->faker->unique()->numerify('############'),
            'alamat' => $this->faker->address,
            'no_hp' => $this->faker->phoneNumber,
            'tgl_lahir' => $this->faker->date,
            'gender' => $this->faker->randomElement(['male', 'female']),
            'pekerjaan' => $this->faker->jobTitle,
        ];
    }
}
