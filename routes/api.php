<?php

use App\Http\Controllers\AsesmenAwalController;
use App\Http\Controllers\AskepController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/pasien/all', [PasienController::class, 'dataPasien'])->middleware('auth:sanctum');

// Route::get('/users', [UserController::class, 'index']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    Route::post('/kegiatan/filter', [KegiatanController::class, 'filterData']);

    Route::post('/askep', [AskepController::class, 'store'])->name('askep.store');

    Route::post('/asesmen', [AsesmenAwalController::class, 'store'])->name('asesmen.store');
});
