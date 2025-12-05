<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->integer('article')->primary();
            $table->string('article_pn')->nullable();
            $table->string('name');
            $table->text('full_name')->nullable();
            $table->integer('category');
            $table->integer('sort')->default(0);
            $table->decimal('price1', 10, 2);
            $table->decimal('price2', 10, 2);
            $table->string('quantity');
            $table->boolean('isnew')->default(0);
            $table->string('quantityMarkdown')->nullable();
            $table->decimal('priceMarkdown', 10, 2)->nullable();
            $table->timestamps();
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
