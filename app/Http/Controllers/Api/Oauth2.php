<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Http\Request;
use App\Models\{CurrencyExchange, User, AccountTypes, Accounts, Currencies, TransactionsTypes};
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
            'currencies' => CurrencyExchange::all()->toArray(),
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

        $user_id = Uuid::uuid1();
        $user = User::create([
            'user_id' => $user_id,
            'name' => $request->name,
            'email' => $request->email,
            'base_currency' => $request->base_currency,
            'password' => Hash::make($request->password)
        ]);

        $currency_exchange_id = Uuid::uuid1();
        $currency = CurrencyExchange::create([
            'currency_exchange_id' => $currency_exchange_id,
            'currency_exchange_name' => $request->base_currency,
            'currency_exchange_convert_to' => $request->base_currency,
            'currency_exchange_value' => 1,
            'currency_exchange_deleteable' => false,
            'user_id' => $user_id
        ]);

        Accounts::create([
            'account_id' => Uuid::uuid1(),
            'account_name' => ucwords('cash'),
            'bank_account_number' => '',
            'account_type_id' => 1,
            'amount' => 0,
            'currency_id' => $currency_exchange_id,
            'deleteable' => 0,
            'color' => 'bg-gradient-primary',
            'exclude_from_stat' => false,
            'user_id' => $user_id
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
            $tokenResult = $user->createToken('authToken')->plainTextToken;
            $data = [
                'flag' => 1,
                'data' => [
                    'user' => $user,
                    'currencies' => $currency,
                    'transactions_type' => TransactionsTypes::all()->toArray(),
                    'accounts_type' => AccountTypes::all()->toArray(),
                    'token' => $tokenResult
                ],
                'message' => 'Your account has been registered'
            ];

            return Response::json($data, 200);
        }
    }

    function register_validation(Request $request) {
        $validator_custom_attribute = [
            'name' => 'User Name',
            'email' => 'Email',
            'password' => 'Password',
        ];
        $validator = Validator::make($request->all(), [
            'name' => [
                'required',
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
    }

    function resend_verification(Request $request) {
        $user = User::find($request->route('id'));
        $user->sendEmailVerificationNotification();
        return Response::make('Verification has been sent to your email');
    }
}
