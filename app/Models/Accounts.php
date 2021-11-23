<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accounts extends Model
{
    use HasFactory;
    protected $primaryKey = 'account_id';
    protected $fillable = ['account_id', 'account_name', 'bank_account_number', 'account_type_id', 'currency_id', 'user_id', 'exclude_from_stat'];
    protected $hidden = ['created_at', 'updated_at'];
    public $incrementing = false;

    public function users() {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function accounts_type() {
        return $this->belongsTo(AccountTypes::class, 'account_type_id', 'account_type_id');
    }

    public function currencies() {
        return $this->belongsTo(Currencies::class, 'currency_id', 'currency_id');
    }

    public function transactions() {
        return $this->hasMany(Transactions::class);
    }
}
