<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MasterController extends Controller
{
    public function index()
    {

        return Inertia::render('Master/Index', [
        ]);
    }
}
