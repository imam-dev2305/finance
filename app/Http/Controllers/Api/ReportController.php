<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class ReportController extends Controller
{
    function get(Request $request) {
        $data = DB::select(DB::raw('call sp_report(?,?,?)'), [$request->user()->user_id, $request->date1, $request->date2]);
        return Response::json(['flag' => 1, 'data' => $data[0]->data, 'message' => ''], 200);
    }
}
