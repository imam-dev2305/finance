<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AccountTypes;

class AccountTypeController extends Controller
{
    function get() {
        return AccountTypes::all();
    }
}
