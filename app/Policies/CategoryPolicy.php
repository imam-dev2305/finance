<?php

namespace App\Policies;

use App\Models\Accounts;
use App\Models\CategoriesUser;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class CategoryPolicy
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

    function update(User $user, CategoriesUser $categories) {
        return $user->user_id === $categories->user_id
            ? Response::allow()
            : Response::deny("You don't have access to perform actions");
    }

    function delete(User $user, CategoriesUser $categories) {
        return $user->user_id === $categories->user_id
            ? Response::allow()
            : Response::deny("You don't have access to perform actions");
    }
}
