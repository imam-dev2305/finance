<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriesUserSettings extends Model
{
    use HasFactory;
    protected $table = 'categories_user_settings';
    protected $primaryKey = 'category_setting_id';
    protected $fillable = ['category_setting_id', 'category_id', 'category_name', 'category_icon', 'category_color', 'user_id'];
    public $incrementing = false;
}
