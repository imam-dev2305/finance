<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\CategoriesUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Ramsey\Uuid\Uuid;

class CategoriesUserController extends Controller
{
    function get(Request $request) {
        $category = Categories::with(['CategoriesUser' => function ($query) use ($request) {
            $query->where('user_id', '=', $request->user()->user_id);
        }]);
        $totalCategories = $category->paginate(10);
        $categories = DB::select(DB::raw('call sp_categories(?)'), [$request->user()->user_id]);
//        $categories = Categories::find('1100')->CategoriesUser()->where('user_id', 'f91ec94e-153b-11ec-a39f-107b4430fda1')->get();
        $response = ['flag' => 1, 'data' => ["recordsTotal" => $totalCategories->perPage(), "recordsFiltered" => $totalCategories->total(), 'data' => $categories[0]->data], 'message' => 'record has been fetched!'];
        return Response::json($response, 200);
    }

    function save(Request $request) {
        $validate = $this->validation($request);
        if ($validate['flag'] === 1) {
            $categories = new CategoriesUser;
            $categories->category_id = Uuid::uuid1();
            $categories->category_parent = $request->category_parent;
            $categories->category_name = $request->category_name;
            $categories->category_icon = $request->category_icon;
            $categories->category_color = $request->category_color;
            $categories->user_id = $request->user()->user_id;
            if ($categories->save()) {
                return Response::json(['flag' => 1, 'data' => [], 'message' => 'Record has been saved!'], 200);
            }
        } else {
            return Response::json(['flag' => 2, 'message' => $validate['message']], 500);
        }
    }

    function edit(Request $request) {
        $validate = $this->validation($request);
        if ($validate['flag'] === 1) {
            $categories_user = CategoriesUser::find($request->category_id);
            $categories_user->category_name = $request->category_name;
            $categories_user->category_icon = $request->category_icon;
            $categories_user->category_color = $request->category_color;
            $categories_user->user_id = $request->user()->user_id;
            if ($categories_user->save()) {
                return Response::json(['flag' => 1, 'data' => [], 'message' => 'Record has been updated!'], 200);
            }
        } else {
            return Response::json(['flag' => 2, 'message' => $validate['message']], 500);
        }
    }

    function delete(Request $request) {
        $categories = CategoriesUser::findOrFail($request->category_id);
        if (!Gate::allows('delete-categories', $categories)) {
            return Response::json(['flag' => 3, 'message' => 'Prevent action!'], 401);
        }
        $categories->delete();
        return Response::json(['flag' => 1, 'data' => [], 'message' => 'Record deleted!'], 200);
    }

    function validation($request) {
        $validator_custom_attribute = [
            'category_name' => 'Name',
            'category_color' => 'Color',
            'category_icon' => 'Icon',
        ];
        $validator = Validator::make($request->all(), [
            'category_parent' => [
                Rule::exists('categories', 'category_id')
            ],
            'category_name' => [
                'required',
                'max:50'
            ],
            'category_icon' => [
                'required',
                'string',
                'max:50'
            ],
            'category_color' => [
                'string',
                'max:50'
            ]
        ], [], $validator_custom_attribute);
        if ($validator->fails()) {
            $response = ['flag' => 2, 'message' => $validator->errors()];
        } else {
            $response = ['flag' => 1];
        }
        return $response;
    }
}
