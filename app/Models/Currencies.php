<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currencies extends Model
{
    use HasFactory;
    protected $primaryKey = 'currency_id';
    protected $table = 'currencies';
    public $incrementing = false;

    public function users() {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function accounts() {
        return $this->hasMany(Accounts::class, 'currency_id', 'currency_id');
    }
}
