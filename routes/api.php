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
Route::post('/login', [\App\Http\Controllers\api\oauth2::class, 'login']);
Route::middleware(['auth:sanctum', 'json.response', 'cors'])->group(function () {
    Route::get('isAuthenticated', function () {
        return ["message" => "Authenticated"];
    });
    Route::prefix('journal')->group(function () {
        Route::get('/list-account', [\App\Http\Controllers\api\module\journal\AccountController::class, 'get']);
    });
    Route::prefix('sub-journal')->group(function () {
        Route::get('/list-account', [\App\Http\Controllers\api\module\journal\SubAccountController::class, 'get']);
        Route::get('/get-account/{id}', [\App\Http\Controllers\api\module\journal\SubAccountController::class, 'id']);
        Route::post('/save-account', [\App\Http\Controllers\api\module\journal\SubAccountController::class, 'save']);
        Route::post('/edit-account', [\App\Http\Controllers\api\module\journal\SubAccountController::class, 'update']);
        Route::post('/delete-account', [\App\Http\Controllers\api\module\journal\SubAccountController::class, 'delete']);
    });
    Route::prefix('transaction')->group(function () {
        Route::post('/list-transaction', [\App\Http\Controllers\api\module\journal\TransactionController::class, 'get']);
        Route::post('/save-transaction', [\App\Http\Controllers\api\module\journal\TransactionController::class, 'filter_action']);
    });
});
