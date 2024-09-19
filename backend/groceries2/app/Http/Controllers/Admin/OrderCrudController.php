<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\OrderRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class OrderCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup()
    {
        CRUD::setModel(\App\Models\Order::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/order');
        CRUD::setEntityNameStrings('order', 'orders');
    }

    protected function setupListOperation()
    {
        CRUD::column('id');
        CRUD::column('username');
        CRUD::column('email');
        CRUD::column('phone');
        CRUD::column('address');
        CRUD::column('totalOrderAmount');
        CRUD::column('paymentId');
        CRUD::column('user_id');
        CRUD::column('created_at');
    }

    protected function setupCreateOperation()
    {
        CRUD::setValidation(OrderRequest::class);

        CRUD::field('username');
        CRUD::field('email');
        CRUD::field('phone');
        CRUD::field('zip');
        CRUD::field('address');
        CRUD::field('totalOrderAmount');
        CRUD::field('user_id');
        CRUD::field('paymentId');
    }
    
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}
