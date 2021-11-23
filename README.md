### install dependencies
`composer install`

### migration
`php artisan migrate`

### serve
`php artisan serve`

### flag
```
1. ok
{
    flag: 1,
    data: {
        user: {},
        categories: {},
        currencies: {},
        transactionType: {},
        token: ''
    },
    message: 'Data saved'
}
2. validation error
{
    flag: 2,
    message: {
        {'attribute': ['error-message']},
        {'attribute': ['error-message']}
    }
}
3. server error
{
    flag: 3,
    message: 'Failed to save record'
}
```

### user login API
```
{
    flag: 1,
    data: {
        user: {
            user_id: '',
            name: '',
            email: '',
            base_currency: ''
        },
        categories: [{
            category_id: '',
            category_parent: '',
            category_name: '',
            category_icon: '',
            category_color: '',
        }],
        currencies: [{
            currency_id: '',
            currency_name: '',
        }],
        transactionType: [{
            transaction_type_id: '',
            transaction_type_name: '',
        }],
        accounts: [{
            account_id: '',
            account_name: '',
        }]
        token: ''
    },
    message: 'User is authenticated'
}
```
### transaction API
```
{
    flag: 1,
    data: {
        transactions: [{
            transaction_id: '',
            transaction_type_id: '',
            transaction_type_name: '',
            account_id: '',
            account_name: '',
            category_id: '',
            category_name: '',
            amount: '',
            currency_id: '',
            currency_name: '',
            transaction_date: '',
            transaction_note: '',
            status: '',
            user_id: '',
        }]
    },
    message: 'Record fetched!'
}
```
