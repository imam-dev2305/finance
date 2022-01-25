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
}
