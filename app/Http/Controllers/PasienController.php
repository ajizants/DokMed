<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePasienRequest;
use App\Http\Requests\UpdatePasienRequest;
use App\Models\Pasien;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PasienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Pasien/Index', [
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
        // Validate the request data
        $validatedData = $request->validated();

        // Create a new patient record in the database
        $pasien = new Pasien(); // Assuming `Pasien` is your model
        $pasien->norm = $validatedData['norm'];
        $pasien->nik = $validatedData['nik'];
        $pasien->nama = $validatedData['nama'];
        $pasien->alamat = $validatedData['alamat'];
        $pasien->no_hp = $validatedData['no_hp'];
        $pasien->tgl_lahir = $validatedData['tgl_lahir'];
        $pasien->gender = $validatedData['gender'];
        $pasien->pekerjaan = $validatedData['pekerjaan'];
        $pasien->id_user = $validatedData['id_user']; // Assuming user ID is optional and defaulting to the current authenticated user
        // $pasien->id_user = $validatedData['id_user'] ?? auth()->id(); // Assuming user ID is optional and defaulting to the current authenticated user

        $pasien->save(); // Save the patient record

        // You can also return a response or redirect
        return response()->json([
            'message' => 'Patient data successfully stored',
            'data' => $pasien,
        ], 201); // HTTP 201 indicates a resource has been created
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
