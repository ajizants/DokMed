<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Kegiatan Harian - {{ $bulanTahun }}</title>

</head>

<body style="background-color: white; color: black; font-family: Arial, sans-serif; margin: 0; padding: 20px;
">
    <div style="max-width: 800px; margin: auto;">

        <!-- Judul Laporan -->
        <h1 style="text-align: center; font-size: 14pt; font-weight: bold;">Laporan Kegiatan Harian
        </h1>
        <h2 style="text-align: center; font-size: 13pt; ">Bulan {{ $bulanTahun }}</h2>

        <!-- Informasi Pegawai -->
        <div style="margin-bottom: 20px; width: 60%; font-size: 12pt;">
            <table style="width: 100%;">
                <tr>
                    <td style="font-weight: bold;">Nama</td>
                    <td>: {{ $identitas->nama }}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Nomor Induk Pegawai</td>
                    <td>: {{ $identitas->nip }}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Unit Kerja</td>
                    <td>: {{ $identitas->unit_kerja }}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Hari/Tanggal</td>
                    <td>: {{ $bulanTahun }}</td>
                </tr>
            </table>
        </div>

        <!-- Tabel Kegiatan -->
        <table style="width: 100%; border-collapse: collapse; border: 1px solid black; font-size: 12pt;">
            <thead>
                <tr style="background-color: #f2f2f2;">
                    <th style="border: 1px solid black; padding: 6px;" rowspan="2">NO.</th>
                    <th style="border: 1px solid black; padding: 6px;" rowspan="2">KEGIATAN DINAS</th>
                    <th style="border: 1px solid black; padding: 6px;" rowspan="2">TANGGAL KEGIATAN DINAS</th>
                    <th style="border: 1px solid black; padding: 6px;" colspan="2">WAKTU</th>
                    <th style="border: 1px solid black; padding: 6px;" rowspan="2">KETERANGAN</th>
                </tr>
                <tr style="background-color: #f2f2f2;">
                    <th style="border: 1px solid black; padding: 6px;">MULAI</th>
                    <th style="border: 1px solid black; padding: 6px;">SELESAI</th>
                </tr>
            </thead>
            @if (isset($error))
                <tbody>
                    <tr>
                        <td style="border: 1px solid black; text-align: center; padding: 20px;" colspan="6">
                            <div
                                style="background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 10px; border-radius: 5px;">
                                <strong> {{ $error }} </strong>
                            </div>
                        </td>
                    </tr>
                </tbody>
            @else
                <tbody>
                    @foreach ($dataKegiatans as $index => $kegiatan)
                        <tr>
                            <td style="border: 1px solid black; padding: 6px; text-align: center;">{{ $index + 1 }}
                            </td>
                            <td style="border: 1px solid black; padding: 6px;">{{ $kegiatan->kegiatan }}</td>
                            <td style="border: 1px solid black; padding: 6px;">
                                {{ \Carbon\Carbon::parse($kegiatan->tanggal)->translatedFormat('d F Y') }}
                            </td>
                            <td style="border: 1px solid black; padding: 6px; text-align: center;">
                                {{ $kegiatan->waktu_mulai }} WIB</td>
                            <td style="border: 1px solid black; padding: 6px; text-align: center;">
                                {{ $kegiatan->waktu_selesai }} WIB</td>
                            <td style="border: 1px solid black; padding: 6px;">{{ $kegiatan->keterangan }}</td>
                        </tr>
                    @endforeach
                </tbody>
            @endif
        </table>

        <!-- Tanda Tangan -->
        <table style="width: 100%; margin-top: 40px; border-collapse: collapse; text-align: center;">
            <tr>
                <td style="font-weight: bold;"></td>

                <td style="font-weight: bold;">Mengetahui</td>
            </tr>
            <tr>
                <td style="font-weight: bold;">Yang Melapor</td>
                <td style="font-weight: bold;">Atasan Langsung</td>
            </tr>
            <tr>
                <td style="height: 80px;"></td> <!-- Ruang untuk tanda tangan -->
                <td></td>
            </tr>
            <tr>
                <td style="text-decoration: underline;">{{ $identitas->nama }}</td>
                <td style="text-decoration: underline;">{{ $identitas->atasan }}</td>
            </tr>
            <tr>
                <td>NIP. {{ $identitas->nip }}</td>
                <td>NIP. {{ $identitas->nip_atasan }}</td>
            </tr>
        </table>
</body>

</html>
