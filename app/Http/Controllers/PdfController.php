<?php
namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\UserProfile;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PdfController extends Controller
{
    /**
     * Generate PDF dari laporan kegiatan.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function generatePDF(Request $request)
    {
        // Ambil parameter dari request
        $params = $request->all();

        // Ambil data untuk PDF
        $data = $this->data($params);

        // Generate PDF
        $pdf = Pdf::loadView('pdf.laporanKegiatan', $data);

        // Buat nama file PDF
        $filename = 'laporan-' . Str::random(10) . '.pdf';

        // Simpan PDF ke penyimpanan sementara
        Storage::put("public/pdfs/{$filename}", $pdf->output());

        // Kembalikan URL file PDF
        return response()->json([
            'url' => asset("storage/pdfs/{$filename}"),
        ]);
    }

    /**
     * Tampilkan view laporan kegiatan.
     *
     * @return \Illuminate\Contracts\View\View
     */
    public function view()
    {
        // Contoh request untuk view
        $request = [
            'tanggal_awal'  => '2025-02-01',
            'tanggal_akhir' => '2025-02-28',
        ];

        // Ambil data untuk view
        $data = $this->data($request);

        // Jika ada error, tampilkan pesan error
        if (isset($data['error'])) {
            return view('pdf.laporanKegiatan', $data)->with('error', $data['error']);
        }

        // Tampilkan view dengan data
        return view('pdf.laporanKegiatan', $data);
    }

    /**
     * Ambil data untuk laporan kegiatan.
     *
     * @param array|null $request
     * @return array
     */
    public function data(array $request = null)
    {
        // Ambil user yang sedang login
        $user = Auth::user();

        // Ambil data kegiatan berdasarkan rentang tanggal
        $dataKegiatans = Kegiatan::where('user_id', $user->id)
            ->whereBetween('tanggal', [$request['tanggal_awal'], $request['tanggal_akhir']])
            ->get();

        // Format bulan dan tahun dalam bahasa Indonesia
        $tgl        = $request['tanggal_awal'];
        $bulanTahun = Carbon::parse($tgl)->translatedFormat('F Y');

        // Ambil profil user
        $profil = UserProfile::where('user_id', $user->id)->first();

        // Siapkan data identitas
        $identitas = (object) [
            'nama'       => $user->name,
            'nip'        => $profil->nip,
            'unit_kerja' => $profil->unit_kerja,
            'atasan'     => $profil->atasan,
            'nip_atasan' => $profil->nip_atasan,
        ];

        // Jika tidak ada data kegiatan, kembalikan pesan error
        if ($dataKegiatans->isEmpty()) {
            return [
                'dataKegiatans' => [],
                'identitas'     => $identitas,
                'bulanTahun'    => $bulanTahun,
                'error'         => 'Tidak ada data kegiatan dalam rentang tanggal yang diberikan.',
            ];
        }

        // Kembalikan data yang diperlukan
        return compact('dataKegiatans', 'identitas', 'bulanTahun');
    }
}
