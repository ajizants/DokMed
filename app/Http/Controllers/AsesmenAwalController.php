<?php
namespace App\Http\Controllers;

use App\Http\Requests\UpdateAsesmenAwalRequest;
use App\Models\AsesmenAwal;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Auth;

class AsesmenAwalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validasi request tambahan (jika perlu)
            $validatedData = $request->validate([
                'no_rm'                     => 'required|string|exists:pasiens,no_rm',
                'data_subjektif'            => 'required|string',
                'data_objektif'             => 'required|string',
                'td'                        => 'required|string',
                'nadi'                      => 'required|numeric|min:0',
                'rr'                        => 'required|numeric|min:0',
                'suhu'                      => 'required|numeric|min:30|max:45',
                'bb'                        => 'required|numeric|min:1',
                'tb'                        => 'required|numeric|min:30',
                'imt'                       => 'required|numeric|min:10',
                'dx_1'                      => 'required|string',
                'dx_2'                      => 'nullable|string',
                'alergi_obat'               => 'nullable|string',
                'alergi_makanan'            => 'nullable|string',
                'riwayat_penyakit_dahulu'   => 'nullable|string',
                'riwayat_penyakit_keluarga' => 'nullable|string',
                'riwayat_penyakit_sekarang' => 'nullable|string',
            ]);

            // Generate nomor transaksi unik
            $noTrans = 'TRX-' . now()->format('YmdHis') . '-' . rand(1000, 9999);

            // Simpan data ke database
            $asesmen = AsesmenAwal::create([
                'users_id'                  => Auth::user()->id,
                'no_trans'                  => $noTrans,
                'no_rm'                     => $validatedData['no_rm'],
                'data_subjektif'            => $validatedData['data_subjektif'],
                'data_objektif'             => $validatedData['data_objektif'],
                'td'                        => $validatedData['td'],
                'nadi'                      => $validatedData['nadi'],
                'rr'                        => $validatedData['rr'],
                'suhu'                      => $validatedData['suhu'],
                'bb'                        => $validatedData['bb'],
                'tb'                        => $validatedData['tb'],
                'imt'                       => $validatedData['imt'],
                'dx_1'                      => $validatedData['dx_1'],
                'dx_2'                      => $validatedData['dx_2'],
                'alergi_obat'               => $validatedData['alergi_obat'],
                'alergi_makanan'            => $validatedData['alergi_makanan'],
                'riwayat_penyakit_dahulu'   => $validatedData['riwayat_penyakit_dahulu'],
                'riwayat_penyakit_keluarga' => $validatedData['riwayat_penyakit_keluarga'],
                'riwayat_penyakit_sekarang' => $validatedData['riwayat_penyakit_sekarang'],
            ]);

            return response()->json([
                'message' => 'Asesmen awal berhasil disimpan',
                'data'    => $asesmen,
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat menyimpan data',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(AsesmenAwal $asesmenAwal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AsesmenAwal $asesmenAwal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAsesmenAwalRequest $request, AsesmenAwal $asesmenAwal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AsesmenAwal $asesmenAwal)
    {
        //
    }
}
