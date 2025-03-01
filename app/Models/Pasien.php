<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pasien extends Model
{
    use HasFactory;
    protected $fillable = ['no_rm', 'nik', 'nama', 'alamat', 'no_hp', 'tgl_lahir', 'gender', 'pekerjaan', 'user_id'];

    public function updateDetails(array $data)
    {

        $data['nama']   = ucwords(strtolower($data['nama']));
        $data['alamat'] = ucwords(strtolower($data['alamat']));

        // Lakukan pembaruan dengan data yang telah dimodifikasi
        $this->update($data);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function asesmentAwal()
    {
        return $this->belongsTo(AsesmenAwal::class, 'no_rm', 'no_rm');
    }
}
