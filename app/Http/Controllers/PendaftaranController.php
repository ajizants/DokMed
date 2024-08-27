<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePasienRequest;
use App\Http\Requests\UpdatePasienRequest;
use App\Models\Pasien;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PendaftaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Pendaftaran/Index', [
            'status' => session('status'),
            'pasien' => Pasien::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Pasien/Index', [
            'status' => session('status'),
            'pasien' => Pasien::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePasienRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        if (strlen($id) === 16) {
            $patient = Pasien::with('user')->where('nik', $id)->first();
        } elseif (strlen($id) === 6) {
            $patient = Pasien::with('user')->find($id);
        } else {
            return response()->json(['error' => 'Kode salah, NORM kurang dari 6 digit atau NIK kurang dari 16 digit'], 400);
        }

        if ($patient) {
            return response()->json($patient);
        } else {
            return response()->json(['error' => 'Pasien Tidak Ditemukan'], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pasien $pasien)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePasienRequest $request, Pasien $pasien)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pasien $pasien)
    {
        //
    }
}
