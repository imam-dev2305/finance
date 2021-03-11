<?php

namespace App\Http\Controllers\api\module\journal;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Journal\SubAccountModel;
use Illuminate\Support\Facades\Validator;

class SubAccountController extends Controller
{
    function get(Request $request) {
        $data = SubAccountModel::join('journal_accounts', 'journal_accounts.journal_account_id', '=', 'sub_journal_accounts.journal_account_id')
            ->where('sub_journal_accounts.user_id', '=', $request->user()->id)
            ->orderBy('sub_journal_account_id', 'asc')
            ->get();
        return $data;
    }
    function id(Request $request, $id) {
        $data = SubAccountModel::join('journal_accounts', 'journal_accounts.journal_account_id', '=', 'sub_journal_accounts.journal_account_id')
            ->where('sub_journal_accounts.user_id', '=', $request->user()->id)
            ->find($id);
        return $data;
    }
    function save(Request $request) {
        $validator_message = [
            'required' => 'Field :attribute wajib diisi'
        ];
        $validator_custom_attribute = [
            'sub_journal_account_name' => 'Nama Akun',
            'journal_account_id' => 'Kategori'
        ];
        $validator = Validator::make($request->all(), [
            'sub_journal_account_name' => [
                'required',
                'max:50'
            ],
            'journal_account_id' => [
                'required'
            ]
        ], $validator_message, $validator_custom_attribute);
        if ($validator->fails()) {
            return ["status" => 500, "message" => $validator->errors()];
        }
        $last_sub_journal_account_id = SubAccountModel::where(['journal_account_id' => $request->journal_account_id])->get();
        if ($last_sub_journal_account_id->count() == 0) {
            $sub_journal_account_id = $request->journal_account_id.".1";
        } else {
            $last_record = $last_sub_journal_account_id->last();
            $last_number = explode(".", $last_record);
            $sub_journal_account_id = $request->journal_account_id.".".(intval($last_number[1]) + 1);
        }
        $sub_journal_account = new SubAccountModel();
        $sub_journal_account->journal_account_id = $request->journal_account_id;
        $sub_journal_account->sub_journal_account_id = $sub_journal_account_id;
        $sub_journal_account->sub_journal_account_name = $request->sub_journal_account_name;
        $sub_journal_account->user_id = $request->user()->id;
        if ($sub_journal_account->save()) {
            return ["status" => 200, "message" => "Data berhasil disimpan"];
        } else {
            return ["status" => 400, "message" => "Data gagal disimpan"];
        }
    }
    function update(Request $request) {
        $validator_message = [
            'required' => 'Field :attribute wajib diisi'
        ];
        $validator_custom_attribute = [
            'sub_journal_account_name' => 'Nama Akun',
            'journal_id' => 'Kategori'
        ];
        $validator = Validator::make($request->all(), [
            'sub_journal_account_name' => [
                'required',
                'max:50'
            ],
            'sub_journal_account_id' => [
                'required',
                'exists:sub_journal_accounts'
            ]
        ], $validator_message, $validator_custom_attribute);
        if ($validator->fails()) {
            return ["status" => 500, "message" => $validator->errors()];
        }
        // Check the given name already exist on database
        $validate_account_name = Validator::make($request->all(), [
           'sub_journal_account_name' => [
               'exists:sub_journal_accounts'
           ]
        ]);
        if (!$validate_account_name->fails()) {
            return ["status" => 500, "message" => "Nama Akun sudah dipakai"];
        }
        $sub_journal_account = SubAccountModel::where('user_id', '=', $request->user()->id)->where('sub_journal_account_id', '=', $request->sub_journal_account_id)->first();
        $sub_journal_account->sub_journal_account_name = $request->sub_journal_account_name;
        $sub_journal_account->save();
        if ($sub_journal_account->wasChanged()) {
            return ["status" => 200, "message" => "Data berhasil dirubah"];
        } else {
            return ["status" => 400, "message" => "Tidak ada perubahan data"];
        }
    }
    function delete(Request $request) {
        $id = $request->sub_journal_account_id;
        $sub_journal_account = SubAccountModel::where('user_id', '=', $request->user()->id)
            ->where('sub_journal_account_id', '=', $id)->first();
        $sub_journal_account->delete();
        return ["status" => 200, "message" => "Data berhasil dihapus"];
    }
}
