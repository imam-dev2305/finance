<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountTypes extends Model
{
    use HasFactory;

    protected $primaryKey = 'account_type_id';
    protected $table = 'account_types';
}
