<?php

namespace App\Models\Journal;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubAccountModel extends Model
{
    use HasFactory;
    protected $fillable = ["sub_journal_account_id", "journal_account_id", "sub_journal_account_name", "user_id"];
    protected $table = "sub_journal_accounts";
    protected $primaryKey = "id";
}
