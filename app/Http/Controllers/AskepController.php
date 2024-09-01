<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAskepRequest;
use App\Http\Requests\UpdateAskepRequest;
use App\Models\Askep;
use App\Models\Sdki;
use App\Models\Slki;
use Inertia\Inertia;

class AskepController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dataSdki = Sdki::all();
        $dataSlki = Slki::all();
        $slki = $dataSlki->map(function ($item) {
            return [
                'kode_slki' => $item->kode_slki,
                'nama_slki' => $item->nama_slki,
            ];
        });

        $sdki = $dataSdki->map(function ($item) {
            return [
                'kode_dx' => $item->kode_dx,
                'diagnosa' => $item->diagnosa,
            ];
        });

        // Kirim data ke frontend menggunakan Inertia
        return Inertia::render('Askep/Index', [
            'sdki' => $sdki,
            'slki' => $slki,
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
        dd($request->all());
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
