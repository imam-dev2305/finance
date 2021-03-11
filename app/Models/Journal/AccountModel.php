<?php

namespace App\Models\Journal;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountModel extends Model
{
    use HasFactory;
    protected $table = 'journal_accounts';
    protected $hidden = ['created_at', 'updated_at'];
    protected $primaryKey = "sub_journal_account_id";
    public $incrementing = false;
}
