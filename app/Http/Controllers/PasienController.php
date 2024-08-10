<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePasienRequest;
use App\Http\Requests\UpdatePasienRequest;
use App\Models\Pasien;
use Inertia\Inertia;

class PasienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Pasien/Index', [
            'status' => session('status'),
            'pasien' => Pasien::all(),
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
    public function store(StorePasienRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Pasien $pasien)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pasien $pasien)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePasienRequest $request, Pasien $pasien)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pasien $pasien)
    {
        //
    }
}
