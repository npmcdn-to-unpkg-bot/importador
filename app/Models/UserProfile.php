<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

class UserProfile extends Model
{
    protected $table = 'user_profile';




    /*public static function getUserProfile($user_namespace,$doc_namespace)
    {
        //return UserProfile::where('namespace', $doc_namespace)->first()->information;

        return DB::table('user_profile AS d')
                    ->join('user_profile AS up', function($join) use ($user_namespace)
                    {
                        $join->where('up.namespace', '=', $user_namespace );
                    })
                    ->select(   'd.id',
                                'd.name',
                                'd.title',
                                'up.namespace AS user_namespace',
                                'd.namespace AS doc_namespace',
                                'd.information AS doc',
                                'd.created_at',
                                'd.updated_at')
                    ->where('d.namespace', '=', $doc_namespace)
                    ->first();
    }*/
}
