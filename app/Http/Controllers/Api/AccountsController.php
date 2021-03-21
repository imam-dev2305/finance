<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Accounts;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class AccountsController extends Controller
{
    function get(Request $request) {
        $accounts = Accounts::where('user_id', '=', $request->user()->user_id)->get();
        return $accounts;
    }

    function save(Request $request) {
        if ($this->validation($request)) {
            $account = new Accounts();
            $account->account_name = $request->account_name;
            $account->bank_account_number = $request->bank_account_number;
            $account->account_type_id = $request->account_type_id;
            $account->currency_id = $request->currency_id;
            $account->exclude_from_stat = $request->exclude_from_stat;
            $account->user_id = $request->user()->user_id;
            if ($account->save()) {
                return ["status" => 200, "message" => "Record has been save"];
            } else {
                return ["status" => 400, "message" => "Failed to save record"];
            }
        }
    }

    function edit(Request $request) {
        if ($this->validation($request)) {
            $accounts = Accounts::find($request->account_id);
            if (!Gate::allows('update-accounts', $accounts)) {
                return ["status" => 403, "message" => "You don't have permission to perform action"];
            }
            $accounts->account_name = $request->account_name;
            $accounts->bank_account_number = $request->bank_account_number;
            $accounts->account_type_id = $request->account_type_id;
            $accounts->currency_id = $request->currency_id;
            $accounts->exclude_from_stat = $request->exclude_from_stat;
            if ($accounts->save()) {
                return ["status" => 200, "message" => "Record has been saved"];
            } else {
                return ["status" => 400, "message" => "Failed to update record"];
            }
        }
    }

    function delete(Request $request) {
//        $validator = Validator::make($request->all(), [
//            'account_id' => [
//                'exists:accounts'
//            ]
//        ]);
//        if ($validator->fails()) {
//            return ["status" => 500, "message" => $validator->errors()];
//        }
        $accounts = Accounts::findOrFail($request->account_id);
        if (!Gate::allows('delete-accounts', $accounts)) {
            return ["status" => 403, "message" => "You don't have permission to perform action"];
        }
        $accounts->delete();
        return ["status" => 200, "message" => "Record has been delete"];
    }

    function validation($request) {
        $validator_custom_attribute = [
            'account_name' => 'Account name',
            'bank_account_number' => 'Bank account number',
            'account_type_id' => 'Type',
            'currency_id' => 'Currency',
            'exclude_from_stat' => 'Exclude from stat'
        ];
        $validator = Validator::make($request->all(), [
            'account_name' => [
                'string',
                'required',
                'max:25'
            ],
            'bank_account_number' => [
                'string',
                'required',
                'max:25'
            ],
            'account_type_id' => [
                'required',
                'exists:account_types'
            ],
            'currency_id' => [
                'required',
                'exists:currencies'
            ],
            'exclude_from_stat' => [
                'boolean'
            ],
        ], [], $validator_custom_attribute);
        if ($validator->fails()) {
            return ["status" => 500, "message" => $validator->errors()];
        }
        return true;
    }
}
