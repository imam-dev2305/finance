<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Provider\Node\RandomNodeProvider;
use Ramsey\Uuid\Uuid;

class TransactionsController extends Controller
{
    function get(Request $request) {
        $transaction = DB::table('transactionuser')
            ->where('user_id', '=', $request->user()->user_id)
            ->limit(100)
            ->orderByDesc('transaction_date')
            ->get();
        return $transaction;
    }

    function save(Request $request) {
        $transaction = new Transactions();
        $nodeProvider = new RandomNodeProvider();
        $transaction->transaction_id = Uuid::uuid1($nodeProvider->getNode());
        $transaction->transaction_type_id = $request->transaction_type_id;
        $transaction->account_id = $request->account_id;
        $transaction->category_id = $request->category_id;
        $transaction->amount = $request->amount;
        $transaction->currency_id = $request->currency_id;
        $transaction->transaction_date = $request->transaction_date;
        $transaction->transaction_note = $request->transaction_note;
        $transaction->transaction_payee = $request->transaction_payee;
        $transaction->status = $request->status;
        $transaction->user_id = $request->user()->user_id;
        $transaction->created_at = now();
        if ($transaction->save()) {
            return ["status" => 200, "message" => "Record has been save"];
        } else {
            return ["status" => 400, "message" => "Failed to save record"];
        }
    }

    function edit(Request $request) {
        $transaction = Transactions::findOrFail($request->transaction_id);
        $transaction->transaction_type_id = $request->transaction_type_id;
        $transaction->account_id = $request->account_id;
        $transaction->category_id = $request->category_id;
        $transaction->amount = $request->amount;
        $transaction->currency_id = $request->currency_id;
        $transaction->transaction_date = $request->transaction_date;
        $transaction->transaction_note = $request->transaction_note;
        $transaction->transaction_payee = $request->transaction_payee;
        $transaction->status = $request->status;
        $transaction->user_id = $request->user()->user_id;
        $transaction->updated_at = date('Y-m-d h:i:s');
        if ($transaction->save()) {
            return ["status" => 200, "message" => "Record has been save"];
        } else {
            return ["status" => 400, "message" => "Failed to update record"];
        }
    }
}
