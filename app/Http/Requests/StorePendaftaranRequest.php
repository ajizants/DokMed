<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePendaftaranRequest extends FormRequest
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
            'no_antri' => 'nullable|string|max:|unique:pendaftarans,no_antri',
            'no_trans' => 'nullable|string|max:|unique:pendaftarans,no_trans',
            'no_rm' => 'required|string|max:6',
            'id_user' => 'nullable|exists:users,id',
        ];
    }

}
