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
Route::get('repot', [\App\Http\Controllers\Api\ReportController::class, 'get']);
Route::post('login', [\App\Http\Controllers\api\Oauth2::class, 'login']);
Route::post('regis', [\App\Http\Controllers\Api\Oauth2::class, 'regis'])->middleware('throttle:3');
Route::post('regis_validation', [\App\Http\Controllers\Api\Oauth2::class, 'register_validation']);
Route::get('country/get', [\App\Http\Controllers\Api\CurrenciesController::class, 'get']);
Route::get('/email/verify/{id}/{hash}', function (Request $request) {
    $id = User::find($request->route('id'));
    if($id->markEmailAsVerified()){
        event(new \Illuminate\Auth\Events\Verified($id));
        return redirect('/');
    }
})->middleware(['signed'])->name('verification.verify');
Route::get('/resend/verification/{id}', [\App\Http\Controllers\Api\Oauth2::class, 'resend_verification']);
Route::middleware(['auth:sanctum', 'json.response', 'cors'])->group(function () {
    Route::get('user', function (Request $request) {
        return \Illuminate\Support\Facades\Response::json(['flag' => 1, 'data' => $request->user(), 'message' => 'Record has been fetched'], 200);
    });

    Route::get('dashboard', [\App\Http\Controllers\Api\DashboardController::class, 'get']);

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

    Route::prefix('currencies')->group(function () {
        Route::get('get', [\App\Http\Controllers\Api\CurrencyExchangeController::class, 'get']);
        Route::get('get/{id}', [\App\Http\Controllers\Api\CurrencyExchangeController::class, 'getCurrency']);
        Route::post('exchange_rate', [\App\Http\Controllers\Api\CurrencyExchangeController::class, 'getRate']);
        Route::post('save', [\App\Http\Controllers\Api\CurrencyExchangeController::class, 'save']);
        Route::post('edit', [\App\Http\Controllers\Api\CurrencyExchangeController::class, 'edit']);
        Route::post('delete', [\App\Http\Controllers\Api\CurrencyExchangeController::class, 'delete']);
    });

    Route::prefix('transactions')->group(function () {
        Route::get('get', [\App\Http\Controllers\Api\TransactionsController::class, 'get']);
        Route::get('get/{id}', [\App\Http\Controllers\Api\TransactionsController::class, 'getTranscationID']);
        Route::post('save', [\App\Http\Controllers\Api\TransactionsController::class, 'save']);
        Route::post('update', [\App\Http\Controllers\Api\TransactionsController::class, 'edit']);
        Route::post('delete', [\App\Http\Controllers\Api\TransactionsController::class, 'delete']);
    });

    Route::prefix('report')->group(function () {
        Route::post('get', [\App\Http\Controllers\Api\ReportController::class, 'get']);
    });

    Route::prefix('country')->group(function () {
        Route::get('filter', [\App\Http\Controllers\Api\CurrenciesController::class, 'getFiltered']);
        Route::get('currency', [\App\Http\Controllers\Api\CurrenciesController::class, 'currency']);
    });
});
