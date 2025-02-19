<?php
namespace App\Http\Controllers;

use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KegiatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Kegiatan/Index', [
            'status' => session('status'),
            // 'pasien' => Pasien::all(),
        ]);
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
        // dd($request);
        try {
            // Simpan ke database
            $kegiatan = Kegiatan::create([
                'user_id'       => Auth::id(),
                'kegiatan'      => $request->kegiatan,
                'tanggal'       => $request->tanggal,
                'waktu_mulai'   => $request->waktu_mulai,
                'waktu_selesai' => $request->waktu_selesai,
                'keterangan'    => $request->keterangan,
            ]);

            $msg = "Kegiatan " . $request->kegiatan . " yang dilakukan oleh " . $request->name_user . " berhasil disimpan!";

            session()->flash('success', 'Kegiatan berhasil disimpan!');
            return redirect()->back();

            return redirect()->back()->with('success', $msg);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan!',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Kegiatan $kegiatan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kegiatan $kegiatan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kegiatan $kegiatan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kegiatan $kegiatan)
    {
        //
    }
}
