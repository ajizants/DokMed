<?php

use App\Http\Controllers\AsesmenAwalController;
use App\Http\Controllers\AskepController;
use App\Http\Controllers\MasterController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\PendaftaranController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\AsesmenAwal;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route::get('/user', [UserController::class, 'index'])->name('user.index');

    Route::get('/pasien', [PasienController::class, 'index'])->name('pasien.index');
    Route::get('/pasien/create', [PasienController::class, 'create'])->name('pasien.create');
    Route::get('/pasien/{id}', [PasienController::class, 'show'])->name('pasien.show');
    Route::post('/pasien', [PasienController::class, 'store'])->name('pasien.store');

    Route::get('/pendaftaran', [PendaftaranController::class, 'index'])->name('pendaftaran.index');
    Route::post('/pendaftaran', [PendaftaranController::class, 'store'])->name('pendaftaran.store');

    Route::get('/askep', [AskepController::class, 'index'])->name('askep.index');
    Route::post('/askep', [AskepController::class, 'store'])->name('askep.store');

    Route::post('/asesmen', [AsesmenAwalController::class, 'store'])->name('asesmen.store');

    Route::get('/master', [MasterController::class, 'index'])->name('master.index');

});

require __DIR__ . '/auth.php';
