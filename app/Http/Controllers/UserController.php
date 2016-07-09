<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User AS User;

use App\Http\Requests;

class UserController extends Controller
{
    public function profile()
    {
        return response()->json(['status'=>'ok','data'=>json_encode(User::getUserProfile())], 200);
    }

    public function docs()
    {
        return response()->json(['status'=>'ok','data'=>json_encode(User::getUserDocs())], 200);
    }
}
