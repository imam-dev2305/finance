<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    use HasFactory;
    protected $table = 'categories';
    protected $primaryKey = 'category_id';
    protected $fillable = ['category_parent', 'category_name', 'category_icon', 'category_color'];
    protected $hidden = ['created_at', 'updated_at'];
    public $incrementing = false;

    function categories() {
        return $this->hasMany(Categories::class, 'category_parent', 'category_id');
    }

    function childrenCategories() {
        return $this->hasMany(Categories::class, 'category_parent', 'category_id');
    }
}
