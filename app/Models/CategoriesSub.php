<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriesSub extends Model
{
    use HasFactory;
    protected $primaryKey = 'category_sub_id';
    protected $fillable = ['category_sub_name', 'category_id', 'category_icon', 'category_color'];
    protected $hidden = ['created_at', 'updated_at'];
    protected $casts = ['category_sub_id' => 'string'];
}
