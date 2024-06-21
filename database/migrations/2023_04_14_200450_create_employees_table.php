<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('name', 160);
            $table->text('photo')->nullable();
            $table->string('religion', 160)->nullable();
            $table->string('phone');
            $table->string('gender', 10)->nullable();
            $table->integer('age')->nullable();
            $table->string('email', 160);
            $table->string('nationality', 160);
            $table->text('address');
            $table->boolean('hired')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
};
