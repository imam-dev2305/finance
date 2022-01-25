<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Transactions extends Model
{
    use HasFactory;
    protected $primaryKey = 'transaction_id';
    protected $fillable = ['transaction_id', 'transaction_type_id', 'account_id', 'category_id', 'amount', 'destination_account_id', 'transaction_date', 'transaction_note', 'transaction_ref', 'status', 'user_id'];
    protected $hidden = ['created_at', 'updated_at'];
    public $incrementing = false;

    public function getCreatedAtAttribute($value)
    {
        $date = $this->asDateTime($value);
        return $date->timezone(Auth::user()->timezone);
    }

    public function getUpdatedAtAttribute($value)
    {
        $date = $this->asDateTime($value);
        return $date->timezone(Auth::user()->timezone);
    }

    public function users() {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function accounts() {
        return $this->belongsTo(Accounts::class, 'account_id', 'account_id');
    }

    public function categories() {
        return $this->belongsTo(Categories::class, 'category_id', 'category_id');
    }

    public function transactions_type() {
        return $this->belongsTo(TransactionsTypes::class,'transaction_type_id', 'transaction_type_id');
    }
}
