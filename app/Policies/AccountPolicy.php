<?php

namespace App\Policies;

use App\Models\Accounts;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class AccountPolicy
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

    function update(User $user, Accounts $accounts) {
        return $user->user_id === $accounts->user_id
            ? Response::allow()
            : Response::deny("You don't have access to perform actions");
    }

    function delete(User $user, Accounts $accounts) {
        return $user->user_id === $accounts->user_id
            ? Response::allow()
            : Response::deny("You don't have access to perform actions");
    }
}
