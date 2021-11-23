<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriesUser extends Model
{
    use HasFactory;
    protected $table = 'categories_user';
    protected $primaryKey = 'category_id';
    protected $fillable = ['category_parent', 'category_name', 'category_id', 'category_icon', 'category_color'];
    protected $hidden = ['created_at', 'updated_at'];
//    protected $casts = ['category_sub_custom_id' => 'string'];
    public $incrementing = false;

    public function categories() {
        return $this->belongsTo(Categories::class, 'category_parent', 'category_id');
    }
}
