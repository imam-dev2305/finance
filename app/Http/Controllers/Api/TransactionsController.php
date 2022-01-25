<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Accounts;
use App\Models\CurrencyExchange;
use App\Models\Transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Response;
use Ramsey\Uuid\Provider\Node\RandomNodeProvider;
use Ramsey\Uuid\Uuid;
use Google;

class TransactionsController extends Controller
{
    function get(Request $request) {
        $transaction = DB::table('transactionuser')
            ->where('user_id', '=', $request->user()->user_id)
            ->limit(100)
            ->orderByDesc('transaction_date')
            ->get();
        $response = ['flag' => 1, 'data' => $transaction, 'message' => 'Record has been fetched!'];
        return Response::json($response, 200);
    }

    function getTranscationID(Request $request, $id) {
        $transaction = DB::table('transactionuser')
            ->where('transaction_id', '=', $id)
            ->where('user_id', '=', $request->user()->user_id)
            ->get();
        $response = ['flag' => 1, 'data' => $transaction, 'message' => 'Record has been fetched!'];
        return Response::json($response, 200);
    }

    function save(Request $request) {
        $account = $request->account_id == 0 ? $request->destination_account_id : $request->account_id;
        $destination_account = $request->account_id == 0 ? $request->account_id : $request->destination_account_id;
        $amount = preg_replace('/(?:\,)/', '.', preg_replace('/(?:\.)/', '', $request->amount));
        $transaction = new Transactions();
        $nodeProvider = new RandomNodeProvider();
        $transaction->transaction_id = Uuid::uuid1($nodeProvider->getNode());
        $transaction->transaction_type_id = $request->transaction_type_id;
        $transaction->account_id = $account;
        $transaction->category_id = $request->category_id;
        $transaction->amount = $amount;
        $transaction->destination_account_id = $destination_account;
        $transaction->transaction_date = date('Y-m-d H:i:s', strtotime($request->transaction_date.' '.$request->transaction_time));
        $transaction->transaction_note = $request->transaction_note;
        $transaction->status = $request->status ?? 1;
        $transaction->user_id = $request->user()->user_id;
        $transaction->created_at = now();
        if ($transaction->save()) {
            /*
             * If the transaction between user account, generate 1 record for destination account
             */
            if ($transaction->account_id !== 0 && $transaction->destination_account_id !== 0) {
                $original_exchange_account = Accounts::findOrFail($request->account_id)->currencies->currency_exchange_name;
                $destination_exchange_account = Accounts::find($request->destination_account_id)->currencies->currency_exchange_name;
                $ntransaction = new Transactions();
                $ntransaction->transaction_id = Uuid::uuid1((new RandomNodeProvider())->getNode());
                $ntransaction->transaction_type_id = $request->transaction_type_id;
                $ntransaction->account_id = $destination_account;
                $ntransaction->category_id = $request->category_id;
                $ntransaction->amount = abs($this->convert_exchange($amount, $original_exchange_account.$destination_exchange_account));
                $ntransaction->destination_account_id = $account;
                $ntransaction->transaction_date = date('Y-m-d H:i:s', strtotime($request->transaction_date.' '.$request->transaction_time));
                $ntransaction->transaction_note = $request->transaction_note;
                $ntransaction->transaction_ref = $transaction->transaction_id;
                $ntransaction->status = $request->status ?? 1;
                $ntransaction->user_id = $request->user()->user_id;
                $ntransaction->created_at = now();
                $ntransaction->save();
            }
            return Response::json(['flag' => 1, 'data' => '', 'message' => 'Record has been saved!']);
        }
    }

    function edit(Request $request) {
        $transaction = Transactions::findOrFail($request->transaction_id);
        if (Gate::allows('update-transactions', $transaction)) {
            $old_transaction_type_id = $transaction->transaction_type_id;
            $new_transaction_type_id = intval($request->transaction_type_id);
            $account = $request->account_id === "0" ? $request->destination_account_id : $request->account_id;
            $destination_account = $request->account_id === "0" ? $request->account_id : $request->destination_account_id;
            $amount = preg_replace('/(?:\,)/', '.',preg_replace('/(?:\.)/', '$1', $request->amount));

            $transaction->transaction_type_id = $request->transaction_type_id;
            if ($transaction->isDirty('transaction_type_id') OR $transaction->destination_account_id !== '') {
                if ($old_transaction_type_id === 3) {
                    $row_doesnt_has_transaction_ref = $transaction->transaction_ref;
                    if (empty($row_doesnt_has_transaction_ref)) {
                        $find_reference_transaction = Transactions::where('transaction_ref', '=', $transaction->transaction_id);
                    } else {
                        $find_reference_transaction = Transactions::find($transaction->transaction_ref);
                    }
                    $find_reference_transaction->delete();
                }
                if ($new_transaction_type_id === 3 AND $destination_account !== "0") {
                    $original_exchange_account = Accounts::findOrFail($request->account_id)->currencies->currency_exchange_name;
                    $destination_exchange_account = Accounts::find($request->destination_account_id)->currencies->currency_exchange_name;
                    $updated_transaction_has_reference = $transaction->transaction_ref;
                    if ($updated_transaction_has_reference !== '') {
                        $amount_reference = $this->convert_exchange(abs(intval($amount)), $original_exchange_account.$destination_exchange_account);
                    } else {
                        $amount_reference = "-".$this->convert_exchange(abs(intval($amount)), $original_exchange_account.$destination_exchange_account);
                    }
                    $ntransaction = new Transactions();
                    $ntransaction->transaction_id = Uuid::uuid1((new RandomNodeProvider())->getNode());
                    $ntransaction->transaction_type_id = $request->transaction_type_id;
                    $ntransaction->account_id = $destination_account;
                    $ntransaction->category_id = $request->category_id;
                    $ntransaction->amount = $amount_reference;
                    $ntransaction->destination_account_id = $account;
                    $ntransaction->transaction_date = date('Y-m-d H:i:s', strtotime($request->transaction_date.' '.$request->transaction_time));
                    $ntransaction->transaction_note = $request->transaction_note;
                    $ntransaction->transaction_ref = $transaction->transaction_id;
                    $ntransaction->status = 1;
                    $ntransaction->user_id = $request->user()->user_id;
                    $ntransaction->created_at = now();
                    $ntransaction->save();
                }
            }
            $transaction->account_id = $account;
            $transaction->category_id = $request->category_id;
            $transaction->amount = $amount;
            $transaction->destination_account_id = $destination_account;
            $transaction->transaction_date = date('Y-m-d H:i:s', strtotime($request->transaction_date.' '.$request->transaction_time.' +1 seconds'));
            $transaction->transaction_note = $request->transaction_note;
            $transaction->transaction_ref = null;
            $transaction->status = 1;
            $transaction->user_id = $request->user()->user_id;
            $transaction->updated_at = date('Y-m-d h:i:s');
            if ($transaction->save()) {
                return Response::json(['flag' => 1, 'data' => [], 'message' => 'Record has been updated!']);
            }
        }
    }

    function delete(Request $request) {
        $transactions = Transactions::findOrFail($request->transaction_id);
        if (Gate::allows('delete-transactions', $transactions)) {
            if (empty($transactions->transaction_ref) AND !$transactions->destination_account !== 0) {
                $transaction_ref = Transactions::where('transaction_ref', '=', $transactions->transaction_id);
                $transaction_ref->delete();
            }
            if ($transactions->transaction_ref) {
                $transaction_ref = Transactions::find($transactions->transaction_ref);
                if ($transaction_ref) {
                    $transaction_ref->delete();
                }
            }
            $transactions->delete();
            return Response::json(['flag' => 1, 'data' => [], 'message' => 'Record deleted!'], 200);
        }
    }

    function convert_exchange($amount, $currency) {
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
        if($sheetsValue->values[0][0] === '#N/A') {
            $sheetsValue->values[0][0] = $amount;
        }
        return doubleval(preg_replace('/(?:\,|\s)/', '.', $sheetsValue->values[0][0]));
    }

    function validation($request) {
    }
}
