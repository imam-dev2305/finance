<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//
//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:api');
Route::post('/login', [\App\Http\Controllers\api\Oauth2::class, 'login']);
Route::post('/regis', [\App\Http\Controllers\Api\Oauth2::class, 'regis']);
Route::middleware(['auth:sanctum', 'json.response', 'cors'])->group(function () {
    Route::get('isAuthenticated', function () {
        return ["message" => "Authenticated"];
    });

    Route::prefix('account')->group(function () {
        Route::get('get', [\App\Http\Controllers\Api\AccountsController::class, 'get']);
        Route::post('save', [\App\Http\Controllers\Api\AccountsController::class, 'save']);
        Route::post('edit', [\App\Http\Controllers\Api\AccountsController::class, 'edit']);
        Route::post('delete', [\App\Http\Controllers\Api\AccountsController::class, 'delete']);
    });

    Route::prefix('categories')->group(function () {
        Route::get('get', [\App\Http\Controllers\Api\CategoriesUserController::class, 'get']);
        Route::post('save', [\App\Http\Controllers\Api\CategoriesUserController::class, 'save']);
        Route::post('edit', [\App\Http\Controllers\Api\CategoriesUserController::class, 'edit']);
        Route::post('delete', [\App\Http\Controllers\Api\CategoriesUserController::class, 'delete']);
    });
});
