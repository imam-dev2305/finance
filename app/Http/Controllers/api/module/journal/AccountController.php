<?php

namespace App\Http\Controllers\api\module\journal;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Journal\AccountModel;

class AccountController extends Controller
{
    function get() {
        $data = AccountModel::all();
        return $data;
    }
}
