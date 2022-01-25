<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Routing\Exceptions\InvalidSignatureException;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;


class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (AuthenticationException $e, $request) {
            return Response::make(['flag' => 3, 'message' => 'Invalid token'], 401, ['Accept' => 'application/json', 'Content-Type' => 'application/json']);
//            return Response::json(['flag' => 1, 'data' => '', 'message' => 'Record not found!']);
        });

        $this->renderable(function (NotFoundHttpException $e, $request) {
            return Response::json(['flag' => 3, 'message' => 'Invalid request'], 404);
        });

        $this->renderable(function (QueryException $e, $request) {
            if (preg_match('/refused/i', $e->getMessage())) {
                return Response::json(['flag' => 3, 'message' => 'Failed to connect DB'], 500);
            } else {
                return Response::json(['flag' => 3, 'message' => $e->getMessage()], 500);
            }
        });

        $this->renderable(function (InvalidSignatureException $e, \Illuminate\Http\Request $request) {
            return Response::make("Link expired. Please click <a href='".url('/api/resend/verification').'/'.$request->route('id')."'>here</a> to resend email verification.");
        });

//        $this->renderable(function (ThrottleRequestsException $e, $request) {
//            return Response::json(['flag' => 3,  'message' => $e->getMessage()], 429)
//        });
    }
}
