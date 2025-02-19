<?php
namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [];

    public function boot()
    {
        $this->registerPolicies();

        // Buat role admin, user, dan nakes
        $adminRole = Role::create(['name' => 'admin']);
        $userRole  = Role::create(['name' => 'user']);
        $nakesRole = Role::create(['name' => 'nakes']);

        // Buat permission untuk setiap role
        $adminPermissions = [
            'manage-users',
            'manage-roles',
            'manage-permissions',
        ];

        $userPermissions = [
            'view-profile',
            'edit-profile',
        ];

        $nakesPermissions = [
            'view-pasien',
            'edit-pasien',
        ];

        // Alokasikan permission ke setiap role
        foreach ($adminPermissions as $permission) {
            Permission::create(['name' => $permission]);
            $adminRole->givePermissionTo($permission);
        }

        foreach ($userPermissions as $permission) {
            Permission::create(['name' => $permission]);
            $userRole->givePermissionTo($permission);
        }

        foreach ($nakesPermissions as $permission) {
            Permission::create(['name' => $permission]);
            $nakesRole->givePermissionTo($permission);
        }
    }
}
