<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;
use DB;

class User extends Model
{
    protected $table = 'user';

    public static function getUserDocs()
    {
        $usersId = Auth::id();
        $usersDocs = DB::table('doc AS d')
                    ->select('d.id', 'd.name', 'd.title','d.doc_namespace')
                    ->where('d.users_id', '=', $usersId)
                    ->get();

        return $usersDocs;
    }

    public static function getUserProfile()
    {
        $usersId = Auth::id();
        $usersProfile = DB::table('users AS u')
                    ->leftJoin('user_profile AS up', function($leftJoin) use ($usersId)
                    {
                        $leftJoin->where('up.users_id', '=', $usersId );
                    })
                    ->select(
                                'u.name AS full_name',
                                'u.nick',
                                'u.user_namespace',
                                'u.email',
                                'up.name',
                                'up.first_last_name',
                                'up.second_last_name'
                            )
                    ->where('u.id', '=', $usersId)
                    ->first();

        return $usersProfile;
    }
}
