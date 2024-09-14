<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->decimal('mrp', 8, 2); // Maximum 8 digits, 2 decimal places
            $table->decimal('selling_price', 8, 2);
            $table->string('itemQuantityType');
            $table->string('slug')->unique();
            $table->string('image')->nullable(); 
            $table->unsignedBigInteger('category_id'); // Foreign key relation with Category
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
