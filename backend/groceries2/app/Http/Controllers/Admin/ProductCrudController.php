<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ProductRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use App\Models\Category;

/**
 * Class ProductCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class ProductCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     * 
     * @return void
     */
    public function setup()
    {
        CRUD::setModel(\App\Models\Product::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/product');
        CRUD::setEntityNameStrings('product', 'products');
    }

    /**
     * Define what happens when the List operation is loaded.
     * 
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        CRUD::column('name')->type('text');
        CRUD::column('description')->type('text');
        CRUD::column('mrp')->type('number');
        CRUD::column('selling_price')->type('number');
        CRUD::column('itemQuantityType')->type('text');
        CRUD::column('slug')->type('text');
        CRUD::column('image')->type('image')->disk('public');
        CRUD::column('category_id')->type('select')->entity('category')->model(Category::class)->attribute('name');
    }

    /**
     * Define what happens when the Create operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::field('name')->type('text')->label('Name');
        CRUD::field('description')->type('textarea')->label('Description');
        CRUD::field('mrp')->type('number')->label('MRP');
        CRUD::field('selling_price')->type('number')->label('Selling Price')->nullable(true)->hint('This field is optional');
        CRUD::field('itemQuantityType')->type('text')->label('Item Quantity Type');
        CRUD::field('slug')->type('hidden');
        CRUD::field('image')->type('upload')->label('Image')->upload(true)->disk('public');
        CRUD::field('category_id')->type('select')->entity('category')->model(Category::class)->attribute('name');
    }

    /**
     * Define what happens when the Update operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}
