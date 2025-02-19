<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    public function run()
    {
        $permissions = ['view products', 'edit products', 'delete products', 'view orders', 'manage users'];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $adminRole = Role::create(['name' => 'admin']);
        $userRole  = Role::create(['name' => 'user']);
        $nakesRole = Role::create(['name' => 'nakes']);

        $adminRole->givePermissionTo(Permission::all());
        $userRole->givePermissionTo(['view products']);
        $nakesRole->givePermissionTo(['view products']);

        $adminUser = User::create([
            'name'     => 'Admin User',
            'email'    => 'admin@example.com',
            'password' => bcrypt('enter12'),
        ]);
        $adminUser->assignRole('admin');

        $normalUser = User::create([
            'name'     => 'Normal User',
            'email'    => 'user@example.com',
            'password' => bcrypt('enter12'),
        ]);
        $normalUser->assignRole('user');

        $nakesUser = User::create([
            'name'     => 'Nakes User',
            'email'    => 'nakes@example.com',
            'password' => bcrypt('enter12'),
        ]);
        $nakesUser->assignRole('nakes');
    }
}
