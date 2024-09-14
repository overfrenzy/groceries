<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    // Fetch all sliders
    public function index()
    {
        $sliders = Slider::all()->map(function($slider) {
            if ($slider->image) {
                $slider->image = url('storage/' . $slider->image);
            }
            return $slider;
        });

        return response()->json($sliders);
    }
}