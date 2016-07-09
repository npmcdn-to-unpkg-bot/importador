<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;
use Auth;

class Doc extends Model
{
    protected $table = 'doc';

    public static function getDoc($user_namespace,$doc_namespace)
    {
        //return Doc::where('namespace', $doc_namespace)->first()->information;

        return DB::table('doc AS d')
                    ->join('users AS u', function($join) use ($user_namespace)
                    {
                        $join->where('u.user_namespace', '=', $user_namespace );
                    })
                    ->select(   'd.id',
                                'd.name',
                                'd.title',
                                'u.user_namespace AS user_namespace',
                                'd.doc_namespace AS doc_namespace',
                                'd.information AS doc',
                                'd.created_at',
                                'd.updated_at')
                    ->where('d.doc_namespace', '=', $doc_namespace)
                    ->first();
    }

    public function postDoc($data)
    {
        $newDoc = DB::table('doc')->insert([
                            'users_id'          => Auth::user()->id,
                            'name'              => $data['name'],
                            'title'             => $data['title'],
                            'doc_namespace'     => $data['doc_namespace']
                        ]);
        return $newDoc;
    }

    public function putDoc($data)
    {
        $updatedDoc = DB::table('doc')->
                            where('id', $data['id'])->
                            update([
                                    'users_id'          => Auth::user()->id,
                                    'name'              => $data['name'],
                                    'title'             => $data['title'],
                                    'doc_namespace'     => $data['doc_namespace'],
                                    'information'       => $data['information']
                                    ]);
        return $updatedDoc;
    }
}
