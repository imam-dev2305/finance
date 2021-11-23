<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Http\Request;
use App\Models\ {
    User,
    AccountTypes,
    Accounts,
    Currencies,
    Categories,
    TransactionsTypes
};
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

class Oauth2 extends Controller
{
    function login(Request $request) {
        $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'flag' => 3,
                'message' => 'Please check your email and password!'
            ], 401);
        }
        $user = User::where('email', $request->email)->first();
        if (!Hash::check($request->password, $user->password, [])) {
            throw new \Exception('Error in Login');
        }
        $tokenResult = $user->createToken('authToken')->plainTextToken;
        $response = ['flag' => 1, 'data' => [
            'user' => $user,
            'currencies' => Currencies::all()->toArray(),
            'transactions_type' => TransactionsTypes::all()->toArray(),
            'accounts_type' => AccountTypes::all()->toArray(),
            'token' => $tokenResult
        ], 'message' => 'User is authenticated'];
        return Response::json($response);
    }

    function regis(Request $request) {
        $validator_custom_attribute = [
            'name' => 'User Name',
            'email' => 'Email',
            'password' => 'Password',
        ];
        $validator = Validator::make($request->all(), [
            'name' => [
                'required',
                'unique:users',
            ],
            'email' => [
                'required',
                'email:filter',
                'unique:users'
            ],
            'password' => [
                'required',
                'max:15'
            ]
        ], [], $validator_custom_attribute);
        if ($validator->fails()) {
            return Response::json(['flag' => 2, 'message' => $validator->errors()], 500);
        }

        $user = User::create([
            'user_id' => Uuid::uuid1(),
//            'user_id' => Uuid::uuid1(),
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        Accounts::create([
            'account_id' => Uuid::uuid1(),
            'account_name' => ucwords('cash'),
            'bank_account_number' => '',
            'account_type_id' => 1,
            'amount' => 0,
            'currency_id' => 'IDR',
            'user_id' => $user->user_id
        ]);

        event(new Registered($user));
//        $url = URL::temporarySignedRoute(
//            'verification.verify',
//            Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
//            [
//                'id' => $user->user_id,
//                'hash' => sha1($user->email),
//            ]
//        );
//        return Response::json($url);
        if ($user->save()) {
            $data = [
                'flag' => 1,
                'data' => [''],
                'message' => 'Your account has been registered'
            ];

            return Response::json($data, 200);
        }
    }
}
