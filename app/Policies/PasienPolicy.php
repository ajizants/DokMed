<?php

namespace App\Policies;

use App\Models\Pasien;
use App\Models\User;

class PasienPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Pasien $pasien): bool
    {
        return $user->hasPermissionTo('create-patient');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create-patient');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Pasien $pasien): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Pasien $pasien): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Pasien $pasien): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Pasien $pasien): bool
    {
        //
    }
}
