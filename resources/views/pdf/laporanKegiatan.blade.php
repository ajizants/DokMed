<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Kegiatan Harian - {{ $bulanTahun }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @page {
            size: 220mm 330mm;
            margin: 20mm;
        }
    </style>
</head>

<body class="bg-white text-gray-800">
    <div class="container mx-auto p-8">
        <!-- Judul Laporan -->
        <h1 class="text-2xl font-bold text-center mb-2">Laporan Kegiatan Harian</h1>
        <h2 class="text-xl text-center mb-3">Bulan {{ $bulanTahun }}</h2>

        <!-- Informasi Pegawai -->
        <div class="mb-8 grid grid-cols-2 gap-2 w-1/3">
            <p class="font-semibold">Nama</p>
            <p>: {{ $identitas->nama }}</p>

            <p class="font-semibold">Nomor Induk Pegawai</p>
            <p>: {{ $identitas->nip }}</p>

            <p class="font-semibold">Unit Kerja</p>
            <p>: {{ $identitas->unit_kerja }}</p>

            <p class="font-semibold">Hari/Tanggal</p>
            <p>: {{ $bulanTahun }}</p>
        </div>

        <!-- Tabel Kegiatan -->
        @if (isset($error))
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong>Error:</strong> {{ $error }}
            </div>
        @else
            <table class="w-full border-collapse border border-gray-400 mb-8">
                <thead>
                    <tr class="bg-gray-200">
                        <th class="border border-gray-400 px-4 py-2" rowspan="2">NO.</th>
                        <th class="border border-gray-400 px-4 py-2" rowspan="2">KEGIATAN DINAS</th>
                        <th class="border border-gray-400 px-4 py-2" rowspan="2">TANGGAL KEGIATAN DINAS</th>
                        <th class="border border-gray-400 px-4 py-2" colspan="2">WAKTU</th>
                        <th class="border border-gray-400 px-4 py-2" rowspan="2">KETERANGAN</th>
                    </tr>
                    <tr class="bg-gray-200">
                        <th class="border border-gray-400 px-4 py-2">MULAI</th>
                        <th class="border border-gray-400 px-4 py-2">SELESAI</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($dataKegiatans as $index => $kegiatan)
                        <tr>
                            <td class="border border-gray-400 px-4 py-2 text-center">{{ $index + 1 }}</td>
                            <td class="border border-gray-400 px-4 py-2">{{ $kegiatan->kegiatan }}</td>
                            <td class="border border-gray-400 px-4 py-2">
                                {{ \Carbon\Carbon::parse($kegiatan->tanggal)->translatedFormat('d F Y') }}
                            </td>
                            <td class="border border-gray-400 px-4 py-2 text-center">{{ $kegiatan->waktu_mulai }} WIB
                            </td>
                            <td class="border border-gray-400 px-4 py-2 text-center">{{ $kegiatan->waktu_selesai }} WIB
                            </td>
                            <td class="border border-gray-400 px-4 py-2">{{ $kegiatan->keterangan }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
        <!-- Tanda Tangan -->
        <div class="flex justify-between mt-12">
            <div>
                <p class="text-white">.</p>
                <p class="font-semibold">Yang Melapor</p>
                <p class="mt-4 underline">{{ $identitas->nama }}</p>
                <p>NIP. {{ $identitas->nip }}</p>
            </div>
            <div>
                <p class="font-semibold">Mengetahui</p>
                <p class="font-semibold">Atasan Langsung</p>
                <p class="mt-4 underline">{{ $identitas->atasan }}</p>
                <p>NIP. {{ $identitas->nip_atasan }}</p>
            </div>
        </div>
    </div>
</body>

</html>
