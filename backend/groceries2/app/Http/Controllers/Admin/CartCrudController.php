<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\CartRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use App\Models\User;
use App\Models\Product;

class CartCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup()
    {
        CRUD::setModel(\App\Models\Cart::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/cart');
        CRUD::setEntityNameStrings('cart', 'carts');
    }

    protected function setupListOperation()
    {
        CRUD::column('user_id')->type('select')->entity('user')->model(User::class)->attribute('name');
        CRUD::column('product_id')->type('select')->entity('product')->model(Product::class)->attribute('name');
        CRUD::column('quantity')->type('number');
        CRUD::column('amount')->type('number');
    }

    protected function setupCreateOperation()
    {
        CRUD::field('user_id')->type('select')->entity('user')->model(User::class)->attribute('name');
        CRUD::field('product_id')->type('select')->entity('product')->model(Product::class)->attribute('name');
        CRUD::field('quantity')->type('number');
        CRUD::field('amount')->type('number');
    }

    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}
