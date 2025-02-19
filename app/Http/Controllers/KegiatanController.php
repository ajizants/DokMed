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
        $dataKegiatan = Kegiatan::with('user')
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($data) {
                return [
                    'id' => $data->id,
                    'kegiatan' => $data->kegiatan,
                    'tanggal' => $data->tanggal,
                    'waktu_mulai' => $data->waktu_mulai,
                    'waktu_selesai' => $data->waktu_selesai,
                    'keterangan' => $data->keterangan,
                    'nama_user' => $data->user->name,
                ];
            });

        return Inertia::render('Kegiatan/Index', [
            'status' => session('status'),
            'data_kegiatan' => $dataKegiatan,
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
    // public function store(Request $request)
    // {
    //     // dd($request);
    //     try {
    //         // Simpan ke database
    //         $kegiatan = Kegiatan::create([
    //             'user_id' => Auth::id(),
    //             'kegiatan' => $request->kegiatan,
    //             'tanggal' => $request->tanggal,
    //             'waktu_mulai' => $request->waktu_mulai,
    //             'waktu_selesai' => $request->waktu_selesai,
    //             'keterangan' => $request->keterangan,
    //         ]);

    //         $msg = "Kegiatan " . $request->kegiatan . " yang dilakukan oleh " . $request->name_user . " berhasil disimpan!";

    //         session()->flash('success', 'Kegiatan berhasil disimpan!');
    //         return redirect()->back();

    //         return redirect()->back()->with('success', $msg);

    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'message' => 'Terjadi kesalahan!',
    //             'error' => $e->getMessage(),
    //         ], 500);
    //     }
    // }

    public function store(Request $request)
    {
        try {
            // Validasi request (disarankan untuk menghindari data kosong)
            $request->validate([
                'kegiatan' => 'required|string|max:255',
                'tanggal' => 'required|date',
                'waktu_mulai' => 'required',
                'waktu_selesai' => 'required',
                'keterangan' => 'nullable|string',
            ]);

            // Simpan ke database
            $kegiatan = Kegiatan::create([
                'user_id' => Auth::id(),
                'kegiatan' => $request->kegiatan,
                'tanggal' => $request->tanggal,
                'waktu_mulai' => $request->waktu_mulai,
                'waktu_selesai' => $request->waktu_selesai,
                'keterangan' => $request->keterangan,
            ]);

            // Kirim respons JSON untuk ditangkap oleh React
            // return response()->json([
            //     'success' => true,
            //     'message' => "Kegiatan '{$request->kegiatan}' berhasil disimpan!",
            //     'data' => $kegiatan, // Kirim data kegiatan terbaru untuk update tabel
            // ], 201);
            return back()->with([
                'success' => "Kegiatan '{$request->kegiatan}' berhasil disimpan!",
                'newData' => $kegiatan,
            ]);

        } catch (\Exception $e) {
            return back()->with([
                'error' => 'Terjadi kesalahan saat menyimpan data!',
                'details' => $e->getMessage(),
            ]);
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
    public function update(Request $request, string $id)
    {
        $data = Kegiatan::find($id);

        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $validatedData = $request->validate([
            'kegiatan' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'waktu_mulai' => 'required',
            'waktu_selesai' => 'required',
            'keterangan' => 'nullable|string',
        ]);

        try {
            // Update nama & email
            $data->update([
                'kegiatan' => $validatedData['kegiatan'],
                'tanggal' => $validatedData['tanggal'],
                'waktu_mulai' => $validatedData['waktu_mulai'],
                'waktu_selesai' => $validatedData['waktu_selesai'],
                'keterangan' => $validatedData['keterangan'],

            ]);

            // return response()->json([
            //     'message' => 'Data Kegiatan berhasil diperbarui',
            //     'user' => $data,
            // ]);
            return back()->with([
                'success' => "Kegiatan '{$request->kegiatan}' berhasil di update!",
                'newData' => $data,
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
        $data = Kegiatan::find($id);

        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        try {
            // Hapus data
            $data->delete();

            return response()->json(['message' => 'Data berhasil dihapus']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal menghapus Data', 'error' => $e->getMessage()], 500);
        }
    }
}
