<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $users = User::select('id', 'name', 'email')
            ->with(['roles:id,name']) // Ambil hanya field yang diperlukan
            ->get()
            ->map(function ($user) {
                // Cek apakah user memiliki sesi aktif dalam 15 menit terakhir
                $isOnline = DB::table('sessions')
                    ->where('user_id', $user->id)
                    ->where('last_activity', '>=', Carbon::now()->subMinutes(15)->timestamp)
                    ->exists();

                return [
                    'id'        => $user->id,
                    'name'      => $user->name,
                    'email'     => $user->email,
                    'roles'     => $user->roles->pluck('name')->implode(', ') ?: '-',
                    'is_online' => $isOnline ? 'Online' : 'Offline',
                ];
            });

        return response()->json([
            'data'    => $users,
            'columns' => [
                ['key' => 'id', 'label' => 'ID'],
                ['key' => 'name', 'label' => 'Nama'],
                ['key' => 'email', 'label' => 'Email'],
                ['key' => 'roles', 'label' => 'Roles'],
                ['key' => 'is_online', 'label' => 'Status'],
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, string $id)
    {
        $user = User::find($id);

        if (! $user) {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }

        $validatedData = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|unique:users,email,' . $id,
            'roles'   => 'required|array',
            'roles.*' => 'exists:roles,name', // Validasi nama role harus ada di database
        ]);

        try {
            // Update nama & email
            $user->update([
                'name'  => $validatedData['name'],
                'email' => $validatedData['email'],
            ]);

            // Sync roles menggunakan Spatie
            $user->syncRoles($validatedData['roles']);

            return response()->json([
                'message' => 'User berhasil diperbarui',
                'user'    => $user->load('roles'),
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal memperbarui user', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        if (! $user) {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }

        try {
            // Hapus semua roles user
            $user->syncRoles([]);

            // Hapus user
            $user->delete();

            return response()->json(['message' => 'User berhasil dihapus']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal menghapus user', 'error' => $e->getMessage()], 500);
        }
    }

}
