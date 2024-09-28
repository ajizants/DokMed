<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePasienRequest extends FormRequest
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
            'no_rm' => 'required|string|max:6|unique:pasiens,no_rm',
            'nik' => 'required|string|max:16|unique:pasiens,nik',
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'no_hp' => 'nullable|string|max:15',
            'tgl_lahir' => 'required|date',
            'gender' => 'required|in:male,female',
            'pekerjaan' => 'nullable|string|max:255',
            'id_user' => 'required|exists:users,id',
        ];
    }
}
