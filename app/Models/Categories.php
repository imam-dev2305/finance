<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    use HasFactory;
    protected $table = 'categories';
    protected $primaryKey = 'category_id';
    protected $fillable = ['category_name', 'category_icon', 'category_color'];
    protected $hidden = ['created_at', 'updated_at'];
    protected $casts = ['category_id' => 'string'];
    public $incrementing = false;

    function subCategories() {
        return $this->hasMany(CategoriesSub::class, 'category_id', 'category_id');
    }

    function subCategoriesUser() {
        return $this->hasMany(CategoriesUser::class, 'category_id', 'category_id');
    }
}
