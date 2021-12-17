<?php

namespace App\Policies;

use App\Models\Transactions;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TransactionPolicy
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

    function update(User $user, Transactions $transactions) {
        return $user->user_id === $transactions->user_id
            ? Response::allow()
            : Response::deny("You don't have access to perform actions");
    }

    function delete(User $user, Transactions $transactions) {
        return $user->user_id === $transactions->user_id
            ? Response::allow()
            : Response::deny("You don't have access to perform actions");
    }
}
