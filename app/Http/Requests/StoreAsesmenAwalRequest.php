<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAsesmenAwalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'no_rm'                     => 'required|string|exists:pasiens,no_rm',
            'data_subjektif'            => 'required|string',
            'data_objektif'             => 'required|string',
            'td'                        => 'required|string',
            'nadi'                      => 'required|numeric|min:30|max:200',
            'rr'                        => 'required|numeric|min:10|max:60',
            'suhu'                      => 'required|numeric|min:30|max:45',
            'bb'                        => 'required|numeric|min:1|max:300',
            'tb'                        => 'required|numeric|min:30|max:250',
            'imt'                       => 'required|numeric|min:10|max:50',
            'dx_1'                      => 'required|string',
            'dx_2'                      => 'nullable|string',
            'alergi_obat'               => 'nullable|string',
            'alergi_makanan'            => 'nullable|string',
            'riwayat_penyakit_dahulu'   => 'nullable|string',
            'riwayat_penyakit_keluarga' => 'nullable|string',
            'riwayat_penyakit_sekarang' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'no_rm.required'          => 'Nomor rekam medis wajib diisi.',
            'no_rm.exists'            => 'Nomor rekam medis tidak ditemukan.',
            'data_subjektif.required' => 'Data subjektif wajib diisi.',
            'data_objektif.required'  => 'Data objektif wajib diisi.',
            'td.required'             => 'Tekanan darah wajib diisi.',
            'nadi.required'           => 'Nadi wajib diisi.',
            'nadi.numeric'            => 'Nadi harus berupa angka.',
            'nadi.min'                => 'Nadi terlalu rendah.',
            'nadi.max'                => 'Nadi terlalu tinggi.',
            'rr.required'             => 'Respirasi wajib diisi.',
            'suhu.required'           => 'Suhu tubuh wajib diisi.',
            'bb.required'             => 'Berat badan wajib diisi.',
            'tb.required'             => 'Tinggi badan wajib diisi.',
            'imt.required'            => 'IMT wajib diisi.',
            'dx_1.required'           => 'Diagnosis utama wajib diisi.',
        ];
    }

}
