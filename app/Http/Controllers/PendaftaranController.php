<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePendaftaranRequest;
use App\Http\Requests\UpdatePasienRequest;
use App\Models\Pasien;
use App\Models\Pendaftaran;
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
    public function store(StorePendaftaranRequest $request)
    {
        $now = date('Ymd');
        $no_rm = $request->no_rm;
        $no_antri = $request->no_antri;

        if (is_null($no_rm)) {
            // Generate a new no_rm and create a new patient
            $lastIdPatienData = Pasien::orderBy('id', 'desc')->first();
            $lastIdPatien = $lastIdPatienData ? $lastIdPatienData->id : 0;
            $no_rm = sprintf("%06d", $lastIdPatien + 1);
            // dd($no_rm);
            // Store the new patient registration
            $registerPatient = Pasien::create([
                'no_rm' => $no_rm,
                'nik' => $request->nik,
                'nama' => $request->nama,
                'alamat' => $request->alamat,
                'no_hp' => $request->no_hp,
                'tgl_lahir' => $request->tgl_lahir,
                'gender' => $request->gender,
                'pekerjaan' => $request->pekerjaan,
                'id_user' => $request->id_user,
            ]);
        } else {
            // Update the existing patient using the provided no_rm
            $alreadyRegisterPatient = Pasien::where('no_rm', $no_rm)->first();
            // dd($alreadyRegisterPatient);

            if ($alreadyRegisterPatient) {
                $alreadyRegisterPatient->update([
                    'nik' => $request->nik,
                    'nama' => $request->nama,
                    'alamat' => $request->alamat,
                    'no_hp' => $request->no_hp,
                    'tgl_lahir' => $request->tgl_lahir,
                    'gender' => $request->gender,
                    'pekerjaan' => $request->pekerjaan,
                    'id_user' => $request->id_user,
                ]);
            } else {
                // Handle the case where the patient with the provided no_rm is not found
                return response()->json(['error' => 'Pasien tidak ditemukan untuk no_rm yang diberikan.'], 404);
            }
        }

        // Now, handle the registration process (same for both create and update)
        $no_trans = $now . $no_rm;
        $registerPatienToday = Pendaftaran::where('no_trans', $no_trans)->first();

        if ($registerPatienToday) {
            return response()->json(['error' => 'Pasien Sudah Terdaftar'], 400);
        }

        Pendaftaran::create([
            'no_antri' => $no_antri,
            'no_trans' => $no_trans,
            'no_rm' => $no_rm,
            'id_user' => $request->id_user,
        ]);

        return response()->json(['success' => 'Pendaftaran Berhasil'], 200);
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
            return response()->json(['error' => 'Kode salah, no_rm kurang dari 6 digit atau NIK kurang dari 16 digit'], 400);
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
