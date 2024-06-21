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
        Schema::table('employee_interview_notes', function (Blueprint $table) {
            $table->unsignedBigInteger('employee_interview_id');
            $table->foreign('employee_interview_id')->references('id')->on('employee_interviews')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('employee_interview_notes', function (Blueprint $table) {
            //
        });
    }
};
