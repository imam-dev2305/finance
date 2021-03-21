<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\CategoriesSub;
use App\Models\CategoriesUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class CategoriesUserController extends Controller
{
    function get(Request $request) {
        $categories = Categories::with('subCategories')
            ->with(['subCategoriesUser' => function ($query) use ($request) {
                $query->where('user_id', '=', $request->user()->user_id);
            }])
            ->get();
        return $categories;
    }

    function save(Request $request) {
        if ($this->validation($request)) {
            $exists_categories = CategoriesUser::where('user_id', '=', $request->user()->user_id)
                ->where('category_id', '=', $request->category_id);
            if ($exists_categories->exists()) {
                $last_record = $exists_categories->get()->last();
                $last_id = intval(explode('.', $last_record->category_sub_custom_id)[1]);
                $category_sub_custom_id = $request->category_id.".".($last_id + 1);
            } else {
                $get_last_sub_categories = CategoriesSub::where('category_id', '=', $request->category_id)
                    ->count();
                $category_sub_custom_id = $request->category_id.".".(intval($get_last_sub_categories) + 1);
            }
            $categories = new CategoriesUser();
            $categories->category_sub_custom_id = $category_sub_custom_id;
            $categories->category_sub_custom_name = $request->category_sub_custom_name;
            $categories->category_id = $request->category_id;
            $categories->category_icon = $request->category_icon;
            $categories->category_color = $request->category_color;
            $categories->user_id = $request->user()->user_id;
            if ($categories->save()) {
                return ["status" => 200, "message" => "Categories has been saved"];
            } else {
                return ["status" => 400, "message" => "Failed to save record"];
            }
        }
    }

    function edit(Request $request) {
        if ($this->validation($request)) {
            $categories = CategoriesUser::findOrFail($request->category_sub_custom_id);
            $categories->category_sub_custom_name = $request->category_sub_custom_name;
            $categories->category_id = $request->category_id;
            $categories->category_icon = $request->category_icon;
            $categories->category_color = $request->category_color;
            if (!Gate::allows('update-categories', $categories)) {
                return ["status" => 403, "message" => "You don't have permission to perform action"];
            }
            if ($categories->save()) {
                return ["status" => 200, "message" => "Categories has been updated"];
            } else {
                return ["status" => 400, "message" => "Failed to update record"];
            }
        }
    }

    function delete(Request $request) {
        $categories = CategoriesUser::findOrFail($request->category_sub_custom_id);
        if (!Gate::allows('delete-categories', $categories)) {
            return ["status" => 403, "message" => "You don't have permission to perform action"];
        }
        $categories->delete();
        return ["status" => 200, "message" => "Record has been delete"];
    }

    function validation($request) {
        $validator_custom_attribute = [
            'category_sub_custom_name' => 'Name',
            'category_color' => 'Color',
            'category_icon' => 'Icon'
        ];
        $validator = Validator::make($request->all(), [
            'category_sub_custom_name' => [
                'string',
                'required',
                'max:25'
            ],
            'category_id' => [
                'required',
                'exists:categories'
            ],
            'category_icon' => [
                'string',
                'max:25'
            ],
            'category_color' => [
                'string',
                'max:10'
            ]
        ], [], $validator_custom_attribute);
        if ($validator->fails()) {
            return ["status" => 500, "message" => $validator->errors()];
        }
        return true;
    }
}
