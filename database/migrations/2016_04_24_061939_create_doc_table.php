<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doc', function (Blueprint $table)
        {
            $table->increments('id')->index();
            $table->integer('users_id')->unsigned();
            $table->string('name', 254);
            $table->string('title', 254);
            $table->string('namespace', 254)->unique();
            $table->text('information');
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
        Schema::drop('doc');
    }
}
