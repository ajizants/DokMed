<?php
namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PdfController extends Controller
{
    public function generatePDF()
    {
        $data = [
            'title'   => 'Laporan PDF',
            'date'    => date('d-m-Y'),
            'content' => 'Ini adalah contoh laporan yang dibuat dengan Laravel 11, Inertia.js, dan React.',
        ];

        $pdf      = Pdf::loadView('pdf.laporanKegiatan', $data);
        $filename = 'laporan-' . Str::random(10) . '.pdf';

        // Simpan PDF ke penyimpanan sementara
        Storage::put("public/pdfs/{$filename}", $pdf->output());

        return response()->json([
            'url' => asset("storage/pdfs/{$filename}"),
        ]);
    }
}
