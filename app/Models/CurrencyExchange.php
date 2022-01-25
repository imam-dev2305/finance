<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CurrencyExchange extends Model
{
    use HasFactory;

    protected $table = 'currencies_exchange';
    protected $primaryKey = 'currency_exchange_id';
    protected $fillable = ['currency_exchange_id', 'currency_exchange_name', 'currency_exchange_convert_to', 'currency_exchange_value', 'currency_exchange_deleteable', 'user_id'];
    public $incrementing = false;

    public function users() {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function accounts() {
        return $this->hasMany(Accounts::class, 'currency_exchange_id', 'currency_id');
    }
}
