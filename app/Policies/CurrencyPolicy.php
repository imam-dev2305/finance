<?php

namespace App\Policies;

use App\Models\CurrencyExchange;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CurrencyPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    function update(User $user, CurrencyExchange $currencyExchange) {
        return $user->user_id === $currencyExchange->user_id
            ? Response::allow()
            : Response::deny("You don't have access to perform actions");
    }

    function delete(User $user, CurrencyExchange $currencyExchange) {
        return $user->user_id === $currencyExchange->user_id
            ? Response::allow()
            : Response::deny("You don't have access to perform actions");
    }
}
