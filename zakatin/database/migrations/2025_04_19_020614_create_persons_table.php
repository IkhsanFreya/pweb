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
        Schema::create('persons', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->text('desc')->nullable();
            $table->foreignUuid('category_id')->constrained();
            $table->timestamps();
        });

        Schema::table('persons', function (Blueprint $table) {
            $table->foreignUuid('family_id')->nullable()->references('id')->on('persons');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('persons');
    }
};
