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
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'norm' => 'required|string|max:10|unique:pasiens,norm',
            'nik' => 'required|string|max:16|unique:pasiens,nik',
            'nama' => 'required|string|max:255',
            'alamat' => 'nullable|string|max:255',
            'no_hp' => 'nullable|string|max:15',
            'tgl_lahir' => 'required|date',
            'gender' => 'required|in:male,female',
            'pekerjaan' => 'nullable|string|max:255',
            'id_user' => 'nullable|exists:users,id',
        ];
    }
}
