<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Accounts;
use App\Models\CurrencyExchange;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Response;
use Google;
use Ramsey\Uuid\Uuid;

class CurrencyExchangeController extends Controller
{
    function get(Request $request) {
        $currency = CurrencyExchange::where('user_id', '=', $request->user()->user_id)->get();
        $response = [
           "flag" => 1,
           "data" => $currency,
           "message" => "Record has been fetched!"
        ];
        return Response::json($response, 200);
    }

    function getCurrency(Request $request, $id)
    {
        $currency = CurrencyExchange::where('user_id', '=', $request->user()->user_id)->findOrFail($id);
        return Response::json(['flag' => 1, 'data' => $currency, 'message' => 'Record has beend fetched!'], 200);
    }

    function save(Request $request) {
        $currency = new CurrencyExchange();
        $currency->currency_exchange_id = Uuid::uuid1();
        $currency->currency_exchange_name = $request->currency_convert_to;
        $currency->currency_exchange_convert_to = $request->currency_origin;
        $currency->currency_exchange_value = doubleval(preg_replace('/(?:\,)/', '.',preg_replace('/(?:\.|[Rp\s]+)/', '$1', $request->currency_value)));
        $currency->currency_exchange_deleteable = true;
        $currency->user_id = $request->user()->user_id;
        if ($currency->save()) {
            return Response::json(['flag' => '1', 'data' => [], 'message' => 'Record has been saved!'], 200);
        }
    }

    function edit(Request $request) {
        $currency = CurrencyExchange::findOrFail($request->currency_exchange_id);
        $currency->currency_exchange_value = doubleval(preg_replace('/(?:\,|\s)/', '.',preg_replace('/(?:\.|[Rp\s])/', '$1', $request->currency_exchange_value)));
        if (Gate::allows('update-currencies', $currency)) {
            if ($currency->save()) {
                return Response::json(['flag' => 1, 'data' => [], 'message' => 'Record has been updated!'], 200);
            }
        }
    }

    function delete(Request $request) {
        $currency = CurrencyExchange::findOrFail($request->currency_exchange_id);
        $find_currency_in_account = Accounts::where('currency_id', '=', $currency->currency_exchange_id)
            ->where('user_id', '=', $request->user()->user_id)->first();
        if ($find_currency_in_account) {
            return Response::json(['flag' => 2, 'data' => [], 'message' => 'Record is used in account'], 200);
        }
        if (Gate::allows('update-currencies', $currency)) {
            if ($currency->delete()) {
                return Response::json(['flag' => 1, 'data' => [], 'message' => 'Record has been deleted!'], 200);
            }
        }
    }

    function getRate(Request $request) {
        $amount = 1;
        $currency = $request->currency_convert_to.$request->currency_origin;
        putenv('GOOGLE_APPLICATION_CREDENTIALS=D:\Project\Web\Backend\socialite\storage\android-blackout-project-a29dce077620.json');
        $client = new Google\Client();
        $client->useApplicationDefaultCredentials();
        $client->setApprovalPrompt('force');
        $client->addScope(['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/spreadsheets']);

        $sheets = new Google\Service\Sheets($client);
        $sheetsId = '1w6B9ls0cshU-snYOP5cpzu6dI5fO7ZOVLz7Ouqwd-Ds';
        $sheetsRange = 'Sheet1!A1';
        $sheetsBody = new Google\Service\Sheets\ValueRange([
            'values' => [
                ['='.$amount.'*GOOGLEFINANCE("CURRENCY:'.$currency.'")']
            ]
        ]);
        $sheetsParam = [
            'valueInputOption' => 'USER_ENTERED'
        ];
        $sheets->spreadsheets_values->update($sheetsId, $sheetsRange, $sheetsBody, $sheetsParam);
        $sheetsValue = $sheets->spreadsheets_values->get($sheetsId, $sheetsRange);
        $rate = doubleval($sheetsValue->values[0][0]);
        return Response::json(['flag' => 1, 'data' => $rate, 'message' => 'Record has been fetched'], 200);
    }
}
