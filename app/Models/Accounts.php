<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accounts extends Model
{
    use HasFactory;
    protected $primaryKey = 'account_id';
    protected $fillable = ['account_name', 'bank_account_number', 'account_type_id', 'currency_id', 'exclude_from_stat'];
    protected $hidden = ['created_at', 'updated_at'];
}
