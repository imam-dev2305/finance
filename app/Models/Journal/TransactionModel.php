<?php

namespace App\Models\journal;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionModel extends Model
{
    use HasFactory;
    protected $primaryKey = "trans_id";
    protected $fillable = ["trans_id", "sub_journal_account_id", "ref", "keterangan", "debet", "kredit", "user_id", "tgl_transaksi"];
    protected $table = "transactions";
}
