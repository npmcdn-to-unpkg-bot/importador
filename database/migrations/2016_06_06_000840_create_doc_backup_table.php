<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocBackupTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doc_backup', function (Blueprint $table)
        {
            $table->increments('id')->index();
            $table->integer('doc_id')->unsigned();
            $table->text('information');
            $table->bigInteger('version')->unsigned();
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
        Schema::drop('doc_backup');
    }
}
