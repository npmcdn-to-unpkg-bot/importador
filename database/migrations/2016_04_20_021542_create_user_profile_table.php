<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserProfileTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_profile', function (Blueprint $table)
        {
            $table->increments('id')->unique;
            $table->integer('users_id')->unsigned();
            $table->string('name', 254);
            $table->string('first_last_name', 254)->nullable();
            $table->string('second_last_name', 254)->nullable();
            $table->string('namespace', 254)->unique();
            $table->timestamps();
            $table->foreign('users_id')->references('id')
            ->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('user_profile', function (Blueprint $table)
        {
            //
        });
    }
}
