<?php
namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */

    public function edit(Request $request): Response
    {
        $user = Auth::user();
        // dd($user);
        $profile = User::find($user->id)->profile;
        // dd($profile);

        return Inertia::render('Profile/Edit', [
            'user'            => $user,                         // Data user utama
            'userProfile'     => $profile ?? new UserProfile(), // Data profil pengguna
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status'          => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {

        // Validasi data untuk kedua tabel
        $validated = $request->validate([
            'name'       => 'required|string|max:255',
            'email'      => 'required|string|email|max:255|unique:users,email',
            'hp'         => 'nullable|numeric|digits_between:10,15', // No HP harus angka, 10-15 digit
            'nip'        => 'nullable|numeric|digits_between:10,18', // NIP harus angka, 10-18 digit
            'atasan'     => 'nullable|string|max:255',
            'nip_atasan' => 'nullable|numeric|digits_between:10,18', // NIP atasan harus angka, 10-18 digit
            'jabatan'    => 'nullable|string|max:255',
            'unit_kerja' => 'nullable|string|max:255',
        ]);

        $user = User::findOrFail($request->user()->id);
        $user->update([
            'name'  => $validated['name'],
            'email' => $validated['email'],
        ]);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        $user->save();

        // Update atau buat data di tabel user_profiles
        UserProfile::updateOrCreate(
            ['user_id' => $user->id], // Kondisi pencarian
            [
                'hp'         => $validated['hp'] ?? null,
                'nip'        => $validated['nip'] ?? null,
                'atasan'     => $validated['atasan'] ?? null,
                'nip_atasan' => $validated['nip_atasan'] ?? null,
            ]
        );

        return Redirect::route('profile.edit')->with('status', 'Update Profile Berhasil..');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
