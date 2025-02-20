<?php
namespace App\Http\Controllers;

use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
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
                    'id'            => $data->id,
                    'kegiatan'      => $data->kegiatan,
                    'tanggal'       => $data->tanggal,
                    'waktu_mulai'   => $data->waktu_mulai,
                    'waktu_selesai' => $data->waktu_selesai,
                    'keterangan'    => $data->keterangan,
                    'name_user'     => $data->user->name,
                    'user_id'       => $data->user_id,
                ];
            });

        return Inertia::render('Kegiatan/Index', [
            'status'        => session('status'),
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

    public function store(Request $request)
    {
        try {
            // Validasi request
            $validated = $request->validate([
                'kegiatan'      => 'required|string|max:255',
                'tanggal'       => 'required|date',
                'waktu_mulai'   => 'required',
                'waktu_selesai' => 'required',
                'keterangan'    => 'nullable|string',
            ]);

            // Simpan ke database
            $kegiatan = Kegiatan::create([
                'user_id'       => Auth::id(),
                'kegiatan'      => $validated['kegiatan'],
                'tanggal'       => $validated['tanggal'],
                'waktu_mulai'   => $validated['waktu_mulai'],
                'waktu_selesai' => $validated['waktu_selesai'],
                'keterangan'    => $validated['keterangan'] ?? null,
            ]);

            // Redirect dengan pesan sukses
            return redirect()->route('kegiatan.index')->with([
                'success' => "Kegiatan '{$validated['kegiatan']}' berhasil disimpan!",
                'newData' => $kegiatan,
            ]);

        } catch (ValidationException $e) {
            // Jika validasi gagal, kembalikan error ke Inertia.js
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            return back()->with([
                'error'   => 'Terjadi kesalahan saat menyimpan data!',
                'details' => $e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function creatPdf(Request $request)
    {
        $dataKegiatan = Kegiatan::with('user')
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($data) {
                return [
                    'id'            => $data->id,
                    'kegiatan'      => $data->kegiatan,
                    'tanggal'       => $data->tanggal,
                    'waktu_mulai'   => $data->waktu_mulai,
                    'waktu_selesai' => $data->waktu_selesai,
                    'keterangan'    => $data->keterangan,
                    'name_user'     => $data->user->name,
                    'user_id'       => $data->user_id,
                ];
            });

        return Inertia::render('Kegiatan/Laporan/Index', [
            'status'        => session('status'),
            'data_kegiatan' => $dataKegiatan,
        ]);
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

        if (! $data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $validatedData = $request->validate([
            'kegiatan'      => 'required|string|max:255',
            'tanggal'       => 'required|date',
            'waktu_mulai'   => 'required',
            'waktu_selesai' => 'required',
            'keterangan'    => 'nullable|string',
        ]);

        try {
            // Update nama & email
            $data->update([
                'kegiatan'      => $validatedData['kegiatan'],
                'tanggal'       => $validatedData['tanggal'],
                'waktu_mulai'   => $validatedData['waktu_mulai'],
                'waktu_selesai' => $validatedData['waktu_selesai'],
                'keterangan'    => $validatedData['keterangan'],

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

        if (! $data) {
            return back()->with([
                'error' => 'Data tidak ditemukan!',
            ]);
        }

        try {
            $data->delete();

            return back()->with([
                'success' => 'Data berhasil dihapus!',
            ]);
        } catch (\Exception $e) {
            return back()->with([
                'error'   => 'Gagal menghapus data!',
                'details' => $e->getMessage(),
            ]);
        }
    }

}
