<?php

use App\Repositories\src\AccountRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;

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
Route::get('coba', function (AccountRepository $accountRepository) {
    return $accountRepository::find('6e543664-2a85-11ec-9b95-d51d1c5eaacf');
});
Route::post('/login', [\App\Http\Controllers\api\Oauth2::class, 'login']);
Route::post('/regis', [\App\Http\Controllers\Api\Oauth2::class, 'regis'])->middleware('throttle:3');
Route::get('/email/verify/{id}/{hash}', function (Request $request) {
    $id = User::find($request->route('id'));
    if($id->markEmailAsVerified()){
        event(new \Illuminate\Auth\Events\Verified($id));
        return redirect('/');
    }
})->middleware(['signed'])->name('verification.verify');
Route::middleware(['auth:sanctum', 'json.response', 'cors'])->group(function () {
    Route::prefix('account')->group(function () {
        Route::get('get/{id}', [\App\Http\Controllers\Api\AccountsController::class, 'getAccount']);
        Route::post('get', [\App\Http\Controllers\Api\AccountsController::class, 'get']);
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

    Route::get('account_type/get', function (\App\Models\AccountTypes $accountTypes) {
        $data = $accountTypes->all();
        $response = ['flag' => 1, 'data' => $data, 'message' => 'Record fetched!'];
        return \Illuminate\Support\Facades\Response::json($response);
    });

    Route::get('currencies/get', function (\App\Models\Currencies $currencies) {
        $data = $currencies->all();
        $response = ['flag' => 1, 'data' => $data, 'message' => 'Record fetched!'];
        return \Illuminate\Support\Facades\Response::json($response);
    });
});
