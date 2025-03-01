<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AsesmenAwal extends Model
{
    use HasFactory;

    protected $fillable = [
        'no_rm',
        'user_id',
        'no_trans',
        'data_objektif',
        'data_subjektif',
        'td',
        'nadi',
        'rr',
        'suhu',
        'bb',
        'tb',
        'imt',
        'dx_1',
        'dx_2',
        'alergi_obat',
        'alergi_makanan',
        'riwayat_penyakit_dahulu',
        'riwayat_penyakit_keluarga',
        'riwayat_penyakit_sekarang',
    ];
}
