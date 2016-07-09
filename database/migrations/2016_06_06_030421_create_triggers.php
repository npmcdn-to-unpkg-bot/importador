<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTriggers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('
        CREATE TRIGGER doc_BEFORE_UPDATE BEFORE UPDATE ON `doc`
            FOR EACH ROW
            BEGIN
                IF OLD.information <> NEW.information THEN
                    CALL save_current_doc_version(OLD.id);
                    CALL delete_oldest_doc_version(OLD.id);
                END IF;
            END
    ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER `doc_BEFORE_UPDATE`');
    }
}
