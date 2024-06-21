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
        Schema::create('salary_slip_structures', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->double('amount')->default(0);
            $table->boolean('deduction')->default(0);
            $table->unsignedBigInteger('salary_slip_id');
            $table->foreign('salary_slip_id')->references('id')->on('salary_slips')->onDelete('cascade');

            $table->unsignedBigInteger('pay_head_id')->nullable();
            $table->foreign('pay_head_id')->references('id')->on('pay_heads')->onDelete('set null');
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
        Schema::dropIfExists('salary_slip_structures');
    }
};
