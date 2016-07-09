<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterDocTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /*Schema::table('doc', function ($table)
        {
            $table->renameColumn('namespace', 'doc_namespace');
        });*/
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /*Schema::table('doc', function ($table)
        {
            $table->renameColumn('doc_namespace', 'namespace');
        });*/
    }
}
