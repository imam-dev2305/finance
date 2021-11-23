<?php


namespace App\Repositories;


use Illuminate\Database\Eloquent\Model;

abstract class ModelRepository
{
    protected $model;

    function __construct(Model $model)
    {
        $this->model = $model;
    }
}
