<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAskepRequest;
use App\Http\Requests\UpdateAskepRequest;
use App\Models\Askep;
use App\Models\Sdki;
use Inertia\Inertia;

class AskepController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil semua data diagnosa dari model Sdki
        $diagnosa = Sdki::all();

        // Ubah menjadi array dengan hanya mengambil field yang dibutuhkan
        $sdki = $diagnosa->map(function ($item) {
            return [
                'kode_dx' => $item->kode_dx,
                'diagnosa' => $item->diagnosa,
                // 'someHiddenData' => $item->someHiddenData, // Jika ada data yang ingin disembunyikan
            ];
        });

        // Kirim data ke frontend menggunakan Inertia
        return Inertia::render('Askep/Index', [
            'sdki' => $sdki,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAskepRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Askep $askep)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Askep $askep)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAskepRequest $request, Askep $askep)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Askep $askep)
    {
        //
    }
}
