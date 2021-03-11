<?php

namespace App\Http\Controllers\api\module\journal;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Journal\TransactionModel;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    function get(Request $request) {
        $records = TransactionModel::where("tgl_transaksi", "=", $request->tgl_transaksi)
            ->where("user_id", "=", $request->user()->id)
            ->get();
        return $records;
    }

    function filter_action(Request $request) {
        $check_transaction_date = TransactionModel::where("tgl_transaksi", "=", $request->all()['tgl_transaksi'])->first();
        if ($check_transaction_date === null) {
            $this->save_all($request);
        } else {
            $get_all_transaction_id = TransactionModel::where("tgl_transaksi", "=", $request->tgl_transaksi)
                ->where("user_id", "=", $request->user()->id)
                ->get();
            if ($get_all_transaction_id->count() > count($request->all()["records"])) {
                foreach ($get_all_transaction_id->toArray() as $key=>$val) {
                    $transaction_id = $request->user()->id."-".date("ymd", strtotime($request->tgl_transaksi))."-".($key + 1);
                    if (isset($request->all()["records"][$key])) {
                        $set = $request->all()["records"][$key];
                        $this->update($set, $transaction_id);
                    } else {
                        $this->delete($transaction_id);
                    }
                }
            } else {
                foreach ($request->all()["records"] as $key=>$val) {
                    $transaction_id = $request->user()->id."-".date("ymd", strtotime($request->tgl_transaksi))."-".($key + 1);
                    $set = $val;
                    $set["tgl_transaksi"] = $request->tgl_transaksi;
                    $set["user_id"] = $request->user()->id;
                    $transaction = TransactionModel::updateOrCreate(
                        ["trans_id" => $transaction_id],
                        $set
                    );
//                    $validate = Validator::make(["trans_id" => $transaction_id], [
//                        "trans_id" => [
//                            "exists:transactions"
//                        ]
//                    ]);
//                    if (!$validate->fails()) {
//                        $set = $val;
//                        $set["tgl_transaksi"] = $request->tgl_transaksi;
//                        $this->update($set, $transaction_id);
//                    } else {
//                        $this->save($val, $transaction_id, $request);
//                    }
                }
                return ["status" => 200, "message" => "Data berhasil dirubah"];
            }
        }
    }

    function save($val, $id, $request) {
        $transaction = new TransactionModel();
        $transaction->trans_id = $id;
        $transaction->sub_journal_account_id = $val["sub_journal_account_id"];
        $transaction->ref = $val["ref"];
        $transaction->keterangan = $val["keterangan"];
        $transaction->debet = $val["debet"];
        $transaction->kredit = $val["kredit"];
        $transaction->user_id = $request->user()->id;
        $transaction->tgl_transaksi = $request->tgl_transaksi;
        if ($transaction->save()) {
            return ["status" => "200", "message" => "Data berhasil disimpan"];
        } else {
            return ["status" => 400, "message" => "Data gagal disimpan"];
        }
    }

    function save_all($request) {
        foreach ($request->all()["records"] as $key=>$val) {
            $transaction_id = $request->user()->id."-".date("ymd", strtotime($request->tgl_transaksi))."-".($key + 1);
            $transaction = new TransactionModel();
            $transaction->trans_id = $transaction_id;
            $transaction->sub_journal_account_id = $val["sub_journal_account_id"];
            $transaction->ref = $val["ref"];
            $transaction->keterangan = $val["keterangan"];
            $transaction->debet = $val["debet"];
            $transaction->kredit = $val["kredit"];
            $transaction->user_id = $request->user()->id;
            $transaction->tgl_transaksi = $request->tgl_transaksi;
            $transaction->save();
        }
        return ["status" => "200", "message" => "Data berhasil disimpan"];
    }

    function update($set, $id) {
        $data = TransactionModel::where("trans_id", "=", $id)
            ->update($set);
        return ["status" => "200", "message" => "Data berhasil dirubah"];
    }

    function delete($id) {
        $data = TransactionModel::find($id);
        $data->delete();
        return ["status" => 200, "message" => "Data berhasil dihapus"];
    }
}
