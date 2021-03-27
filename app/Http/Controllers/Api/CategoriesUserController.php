<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\CategoriesUser;
use App\Models\CategoriesUserSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

class CategoriesUserController extends Controller
{
    function get(Request $request) {
        $categories = Categories::with(['CategoriesUserSettings' => function ($query) use ($request) {
           $query->where('user_id', '=', $request->user()->user_id);
        }])
            ->with(['CategoriesUser' => function ($query) use ($request) {
                $query->where('user_id', '=', $request->user()->user_id);
            }])
            ->get();
        return $categories;
    }

    function save(Request $request) {
        if ($this->validation($request) === true) {
            if ($this->validation_category($request) === true) {
                $categories = new CategoriesUser;
                $categories->category_id = Uuid::uuid1();
                $categories->category_parent = $request->category_parent;
                $categories->category_name = $request->category_name;
                $categories->category_icon = $request->category_icon;
                $categories->category_color = $request->category_color;
                $categories->user_id = $request->user()->user_id;
                if ($categories->save()) {
                    return ["status" => 200, "message" => "Categories has been saved"];
                } else {
                    return ["status" => 400, "message" => "Failed to save record"];
                }
            } else {
                return $this->validation_category($request);
            }
        } else {
            return $this->validation($request);
        }
    }

    function edit(Request $request) {
        if ($this->validation($request) === true) {
            $cek_add_or_setting = Categories::where('category_id', '=', $request->category_id);
            if ($cek_add_or_setting->exists()) {
                return $this->update_settings($request);
            } else {
                return $this->update_categories($request);
            }
        } else {
            return $this->validation($request);
        }
    }

    function update_categories($request) {
        $categories = CategoriesUser::findOrFail($request->category_id);
        $categories->category_name = $request->category_name;
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

    function update_settings($request) {
        if (!empty($request->category_setting_id)) {
            $categories = CategoriesUserSettings::find($request->category_setting_id);
            $categories->category_id = $request->category_id;
            $categories->category_name = $request->category_name;
            $categories->category_icon = $request->category_icon;
            $categories->category_color = $request->category_color;
        } else {
            $validate = CategoriesUserSettings::where('category_id', '=', $request->category_id)
                ->where('user_id', '=', $request->user()->user_id)
                ->get();
            if ($validate->isEmpty()) {
                $category_id = Categories::find($request->category_id);
                if ($category_id === null) {
                    return ["status" => 400, "message" => "Category not found"];
                } else {
                    $categories = new CategoriesUserSettings;
                    $categories->category_setting_id = Uuid::uuid1();
                    $categories->category_id = $request->category_id;
                    $categories->category_name = $request->category_name;
                    $categories->category_icon = $request->category_icon;
                    $categories->category_color = $request->category_color;
                    $categories->user_id = $request->user()->user_id;
                }
            } else {
                return ["status" => 400, "message" => "Invalid Request"];
            }
        }
        if ($categories->save()) {
            return ["status" => 200, "message" => "Categories has been updated"];
        } else {
            return ["status" => 400, "message" => "Failed to update record"];
        }
    }

    function delete(Request $request) {
        $categories = CategoriesUser::findOrFail($request->category_id);
        if (!Gate::allows('delete-categories', $categories)) {
            return ["status" => 403, "message" => "You don't have permission to perform action"];
        }
        $categories->delete();
        return ["status" => 200, "message" => "Record has been delete"];
    }

    function validation($request) {
        $validator_custom_attribute = [
            'category_name' => 'Name',
            'category_color' => 'Color',
            'category_icon' => 'Icon',
        ];
        $validator = Validator::make($request->all(), [
            'category_name' => [
                'string',
                'required',
                'max:50'
            ],
            'category_icon' => [
                'string',
                'max:50'
            ],
            'category_color' => [
                'string',
                'max:10'
            ]
        ], [], $validator_custom_attribute);
        if ($validator->fails()) {
            return ["status" => 500, "message" => $validator->errors()];
        }
        $categories_name = CategoriesUser::where('category_name', '=', $request->category_name)
            ->where('user_id', '=', $request->user()->user_id)
            ->get();
        if (!$categories_name->isEmpty()) {
            return ["status" => 500, "message" => ["category_name" => ["Name already exists"]]];
        }
        return true;
    }

    function validation_category($request) {
        $categories_parent = Categories::find($request->category_parent);
        if ($categories_parent === null AND !empty($request->category_parent)) {
            return ["status" => 500, "message" => ["category_id" => ["Category not found"]]];
        }
        return true;
    }
}
