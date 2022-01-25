<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Accounts;
//use App\Repositories\src\AccountRepository as Accounts;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Provider\Node\RandomNodeProvider;
use Ramsey\Uuid\Uuid;

class AccountsController extends Controller
{
    function get(Request $request) {
        $account = Accounts::with('currencies')->Exclude($request)->where('user_id', '=', $request->user()->user_id);
        $accounts = $account->get();
        $response = ['flag' => 1, 'data' => ["recordsTotal" => $accounts->count(), "data" => $accounts], 'message' => 'record has been fetched!'];
        return Response::json($response, 200);
    }

    function getAccount($id) {
        $accounts = Accounts::find($id);
        $response = ['flag' => 1, 'data' => $accounts, 'message' => 'Record has been fetched!'];
        return Response::json($response);
    }

    function save(Request $request) {
        if ($this->validation($request) === true) {
            $account = new Accounts();
            $nodeProvider = new RandomNodeProvider();
            $account->account_id = Uuid::uuid1($nodeProvider->getNode());
            $account->account_name = $request->account_name;
            $account->bank_account_number = $request->bank_account_number;
            $account->account_type_id = $request->account_type_id;
            $account->amount = preg_replace('/(?:\.)/', '$1', $request->amount);
            $account->currency_id = $request->currency_id;
            $account->deleteable = 1;
            $account->exclude_from_stat = 0;
            $account->color = $request->color;
            $account->user_id = $request->user()->user_id;
            if ($account->save()) {
                return Response::json(['flag' => 1, 'data' => [], 'message' => 'Record has been saved!'], 200);
            }
        } else {
            return $this->validation($request);
        }
    }

    function edit(Request $request) {
        if ($this->validation($request) === true) {
            $accounts = Accounts::find($request->account_id);
            if (Gate::allows('update-accounts', $accounts)) {
                $accounts->account_name = $request->account_name;
                $accounts->bank_account_number = $request->bank_account_number;
                $accounts->account_type_id = $request->account_type_id;
                $accounts->amount = preg_replace('/(?:\.)/', '$1', $request->amount);
                $accounts->currency_id = $request->currency_id;
                $accounts->exclude_from_stat = 0;
                $accounts->color = $request->color;
                if ($accounts->save()) {
                    return Response::json(['flag' => 1, 'data' => [], 'message' => 'Record has been updated!'], 200);
                }
            }
        } else {
            return $this->validation($request);
        }
    }

    function delete(Request $request) {
        $accounts = Accounts::findOrFail($request->account_id);
        if (Gate::allows('delete-accounts', $accounts)) {
            if ($accounts->deleteable === 1) {
                $accounts->delete();
                return Response::json(['flag' => 1, 'data' => [], 'message' => 'Record deleted!'], 200);
            } else {
                return Response::json(['flag' => 2, 'data' => [], 'message' => 'This account can\'t be deleted'], 200);
            }
        }
    }

    function validation($request) {
        $request->amount = intval(preg_replace('/(?:\.)/', '$1', $request->amount));
        $validator_custom_attribute = [
            'account_name' => 'Account name',
            'bank_account_number' => 'Bank account number',
            'account_type_id' => 'Type',
            'currency_id' => 'Currency',
            'amount' => 'Amount',
            'exclude_from_stat' => 'Exclude from stat'
        ];
        $validator = Validator::make($request->all(), [
            'account_name' => [
                'string',
                'required',
                'max:50'
            ],
            'bank_account_number' => [
                'string',
                'nullable',
                'max:25'
            ],
            'account_type_id' => [
                'required',
                'exists:account_types,account_type_id'
            ],
            'currency_id' => [
                'required',
                'exists:currencies_exchange,currency_exchange_id'
            ],
            'amount' => [
                'required',
                function ($attribute, $value, $fail) {
                    if (!preg_match('/[\d]*/', $value)) {
                        $fail('The '.$attribute.' should be integer');
                    }
                }
            ],
            'color' => [
                'required'
            ]
        ], [], $validator_custom_attribute);
        if ($validator->fails()) {
            return Response::json(['flag' => 2, 'message' => $validator->errors()], 500);
        }
        return true;
    }
}
