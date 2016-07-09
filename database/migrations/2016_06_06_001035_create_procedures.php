<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProcedures extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('
        CREATE PROCEDURE `save_current_doc_version`(IN doc_id INT)
        BEGIN
            SET @doc_information= (SELECT d.information FROM doc AS d WHERE d.id=doc_id);
            SET @doc_last_version= (SELECT MAX(db.version) FROM doc_backup AS db WHERE db.doc_id=doc_id);

            IF @doc_last_version IS NULL
            THEN
                SET @doc_last_version=1;
            ELSE
                SET @doc_last_version=@doc_last_version + 1;
            END IF;

            IF NOT @doc_information IS NULL
            THEN
                INSERT INTO doc_backup
                (doc_id,information,version,created_at)
                VALUES (doc_id,@doc_information,@doc_last_version,now());
            END IF;
        END
        ');
    DB::unprepared('
    CREATE PROCEDURE `delete_oldest_doc_version`(IN doc_id INT)
        BEGIN
            SET @doc_limit_version= (SELECT d.limit_version FROM doc AS d WHERE d.id=doc_id);
            SET @doc_last_version= (SELECT MAX(db.version) FROM doc_backup AS db WHERE db.doc_id=doc_id);
            SET @doc_id= doc_id;

            IF NOT @doc_limit_version IS NULL AND @doc_last_version > @doc_limit_version THEN

            SET @doc_expired_version= @doc_last_version - @doc_limit_version;
                DELETE
                FROM    doc_backup
                WHERE   doc_backup.doc_id=doc_id  AND
                        doc_backup.version <= @doc_expired_version;
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
        DB::unprepared('DROP PROCEDURE `save_current_doc_version`');
        DB::unprepared('DROP PROCEDURE `delete_oldest_doc_version`');
    }
}
