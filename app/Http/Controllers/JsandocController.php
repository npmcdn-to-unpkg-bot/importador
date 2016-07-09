<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Jsandoc AS Doc;

use App\Http\Requests;

class DocController extends Controller
{
    public function show($doc_namespace)
    {
        return response()->json(['status'=>'ok','data'=>Jsandoc::getJsandoc($doc_namespace)], 200);
    }
}
