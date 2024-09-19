<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\OrderItemListRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class OrderItemListCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup()
    {
        CRUD::setModel(\App\Models\OrderItemList::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/order-item-list');
        CRUD::setEntityNameStrings('order item', 'order items');
    }

    protected function setupListOperation()
    {
        CRUD::column('id');
        CRUD::column('order_id')->type('select')->entity('order')->model('App\Models\Order')->attribute('id');
        CRUD::column('product_id')->type('select')->entity('product')->model('App\Models\Product')->attribute('name');
        CRUD::column('quantity');
        CRUD::column('price');
        CRUD::column('created_at');
    }

    protected function setupCreateOperation()
    {
        CRUD::setValidation(OrderItemListRequest::class);

        CRUD::field('order_id')->type('select')->entity('order')->model('App\Models\Order')->attribute('id');
        CRUD::field('product_id')->type('select')->entity('product')->model('App\Models\Product')->attribute('name');
        CRUD::field('quantity');
        CRUD::field('price');
    }

    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}
