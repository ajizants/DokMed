<?php
namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name'              => fake()->name(),
            'email'             => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password'          => static::$password ??= Hash::make('password'),
            'remember_token'    => Str::random(10),
        ];
    }

    /**
     * Konfigurasi setelah pembuatan user.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (User $user) {
            // Pilih role secara acak
            $role = fake()->randomElement(['user', 'nakes']);

            // Pastikan role sudah ada di database sebelum diberikan ke user
            if (Role::where('name', $role)->exists()) {
                $user->assignRole($role);
            }
        });
    }
}
