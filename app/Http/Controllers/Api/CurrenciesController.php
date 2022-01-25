<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CurrencyExchange;
use Illuminate\Http\Request;
use App\Models\Currencies;
use Illuminate\Support\Facades\Response;

class CurrenciesController extends Controller
{
    function get()
    {
        return Response::json(['flag' => 1, 'data' => Currencies::all(), 'message' => 'Record has been fetched!'], 200);
    }

    function currency(Request $request)
    {
        $currencies = CurrencyExchange::select('currency_exchange_name')->where('user_id', '=', $request->user()->user_id)->get()->toArray();
        $list_currency = array_map(function ($v) {
            return $v['currency_exchange_name'];
        }, $currencies);
        $currency = Currencies::select('code')->whereNotIn('code', $list_currency)->orderBy('code', 'ASC')->groupBy('code')->get();
        return Response::json(['flag' => 1, 'data' => $currency, 'message' => 'Record has been fetched!'], 200);
    }

    function getFiltered(Request $request)
    {
        $currency = CurrencyExchange::select('currency_exchange_name')->where('user_id', '=', $request->user()->user_id)->get()->toArray();
        $list_currency = array_map(function ($v) {
            return $v['currency_exchange_name'];
        }, $currency);
        $country = Currencies::whereNotIn('code', $list_currency)->get();
        return Response::json(['flag' => 1, 'data' => $country, 'message' => 'Record has been fetched!'], 200);
    }
}
