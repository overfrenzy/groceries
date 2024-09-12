<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class SliderCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup()
    {
        CRUD::setModel(\App\Models\Slider::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/slider');
        CRUD::setEntityNameStrings('slider', 'sliders');
    }

    protected function setupListOperation()
    {
        CRUD::column('name')->type('text');
        CRUD::column('image')->type('image')->disk('public');
        CRUD::column('type')->type('enum');
    }

    protected function setupCreateOperation()
    {
        CRUD::field('name')->type('text')->label('Name');
        CRUD::field('image')->type('upload')->label('Image')->upload(true)->disk('public');
        CRUD::field('type')->type('select_from_array')->options(['home' => 'Home', 'banner' => 'Banner']);
    }

    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}