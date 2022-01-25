<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Accounts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class DashboardController extends Controller
{
    function get(Request $request) {
        $accounts = Accounts::select(DB::raw('account_id, account_name, amount * currency_exchange_value as saldo'))
            ->join('account_types', 'accounts.account_type_id', '=', 'account_types.account_type_id')
            ->join('currencies_exchange', 'accounts.currency_id', '=', 'currencies_exchange.currency_exchange_id')
            ->where('accounts.user_id', '=', $request->user()->user_id)
            ->get();
        $total_saldo = Accounts::select(DB::raw('SUM(accounts.amount * currency_exchange_value) as Saldo'))
            ->join('currencies_exchange', 'accounts.currency_id', '=', 'currencies_exchange.currency_exchange_id')
            ->where('accounts.user_id', '=', $request->user()->user_id)
            ->get()
            ->first();
        $persentase_accounts = [];
        foreach ($accounts as $acc=>$valc) {
            $persentase_accounts[$valc->account_name] = ($valc->saldo * 100) / ($total_saldo->Saldo ?: 1);
        }
        $sum_transaction_by_month = DB::table('transactionuser')
            ->select(DB::raw('YEAR(transaction_date) as years,MONTH(transaction_date) as months, SUM(convert_amount) as saldo'))
            ->where('user_id', '=', $request->user()->user_id)
            ->whereBetween(DB::raw('left(transaction_date,10)'), [date('Y-m-d', strtotime('-11 month')), date('Y-m-t')])
            ->groupBy(DB::raw('YEAR(transaction_date),MONTH(transaction_date)'))
            ->get();
        $record_cashflow = DB::table(DB::raw('('.
            DB::table('transactionuser')
                ->select(DB::raw('YEAR(transaction_date) as years, MONTH(transaction_date) as months, case when transaction_type_id = 1 then sum(convert_amount) end as income, case when transaction_type_id = 2 then sum(convert_amount) end as expense'))
                ->whereRaw('user_id = \''.$request->user()->user_id.'\'')
                ->whereRaw('left(transaction_date, 10) BETWEEN DATE(CURRENT_DATE - INTERVAL 11 MONTH) AND LAST_DAY(NOW())')
                ->groupBy(DB::raw('YEAR(transaction_date),MONTH(transaction_date), transaction_type_id'))
                ->toSql()
            .') as a'))
            ->select(DB::raw('years, months, ifnull(SUM(income), 0) as income, ifnull(SUM(expense),0) as expense, (ifnull(SUM(income),0) + ifnull(SUM(expense),0)) as cashflow'))
            ->groupBy('years', 'months')
            ->get();
        $income = [];
        $expense = [];
        $cashflow = [];
        $month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $row_saldo = [];
        if ($sum_transaction_by_month->count() < 12) {
            $start_month = intval(date('n', strtotime('+1 month')));
            $list_month = [];
            for ($i = $start_month; $i < ($start_month + 12); $i++) {
                if ($i > 12) {
                    $list_month[] = $i-12;
                } else {
                    $list_month[] = $i;
                }
            }
            foreach ($list_month as $key=>$value) {
                foreach ($sum_transaction_by_month as $k=>$v) {
                    if ($value === $v->months) {
                        $row_saldo[] = $v->saldo;
                    }
                }
                foreach ($record_cashflow as $keyrecord=>$record) {
                    if ($value === $record->months) {
                        $income[] = $record->income;
                        $expense[] = $record->expense;
                        $cashflow[] = $record->cashflow;
                    }
                }
                if(count($row_saldo) !== ($key + 1)) {
                    $row_saldo[] = 0;
                    $income[] = 0;
                    $expense[] = 0;
                    $cashflow[] = 0;
                }
            }
        } else {
            foreach ($sum_transaction_by_month as $key=>$value) {
                $row_saldo[] = $value->saldo;
            }
            foreach ($record_cashflow as $keyrecord=>$record) {
                $income[] = $record->income;
                $expense[] = $record->expense;
                $cashflow[] = $record->cashflow;
            }
        }
        $initial_transactions = array_sum($row_saldo);
        $initial_saldo = $total_saldo->Saldo-$initial_transactions;
        $current_saldo = $initial_saldo;
        for ($loop = 0; $loop<count($row_saldo); $loop++) {
            $current_saldo = $row_saldo[$loop] + $current_saldo;
            $row_saldo[$loop] = $current_saldo;
        }
        return Response::json(['flag' => 1, 'data' => ['Assets' => $accounts, 'Balance' => $row_saldo, 'TotalSaldo' => $total_saldo->Saldo, 'PercentageAccount' => $persentase_accounts, 'Cashflow' => ['income' => $income, 'expense' => $expense, 'cashflow' => $cashflow]]],200);
    }
}
