<?php


namespace App\Repositories\src;

use App\Models\Accounts;
use App\Repositories\ModelRepository;

class AccountRepository extends ModelRepository
{
    function __construct()
    {
        $model = new Accounts();
        parent::__construct($model);
    }

    function __call($name, $arguments)
    {
        return $this->call($name, $arguments);
    }

    static function __callStatic($method, $parameters)
    {
        return (new static)->call($method, $parameters);
    }

    private function pagination($param, $limit, $offset)
    {
        return $this->where($param)
            ->limit($limit)
            ->offset($offset)
            ->get();
    }

    function update($param, $set)
    {
        return $this->model::where($param)
            ->update($set);
    }

    function delete($id)
    {
        return $this->model::find($id)->delete();
    }

    function save($values)
    {
        $val = [];
        foreach ($values as $key=>$value) {
            $val[$key] = $value;
        }
        return $this->model::create($val)->save();
    }

    private function find($id)
    {
        return $this->model::find($id);
    }

    private function call($method, $args)
    {
        if (!method_exists($this , $method)) {
            throw new Exception('Call undefined method ' . $method);
        }

        return $this->{$method}(...$args);
    }
}
