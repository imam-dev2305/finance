<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Currencies;

class CurrenciesController extends Controller
{
    function get()
    {
        return Currencies::all();
    }
}
