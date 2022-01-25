<?php

namespace App\Providers;

use App\Models\Transactions;
use App\Policies\AccountPolicy;
use App\Policies\CategoryPolicy;
use App\Policies\CurrencyPolicy;
use App\Policies\TransactionPolicy;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
         'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // Accounts
        Gate::define('update-accounts', [AccountPolicy::class, 'update']);
        Gate::define('delete-accounts', [AccountPolicy::class, 'delete']);

        // Categories
        Gate::define('update-categories', [CategoryPolicy::class, 'update']);
        Gate::define('delete-categories', [CategoryPolicy::class, 'delete']);

        // Transactions
        Gate::define('update-transactions', [TransactionPolicy::class, 'update']);
        Gate::define('delete-transactions', [TransactionPolicy::class, 'delete']);

        // Currencies
        Gate::define('update-currencies', [CurrencyPolicy::class, 'update']);
        Gate::define('delete-currencies', [CurrencyPolicy::class, 'delete']);
    }
}
