<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
/*
Route::group(['middleware' => ['web']], function ()
{
    // Authentication routes...
    Route::get('auth/login', 'Auth\AuthController@getLogin');
    Route::post('auth/login', 'Auth\AuthController@postLogin');
    Route::get('auth/logout', 'Auth\AuthController@getLogout');

    // Registration routes...
    Route::get('auth/register', 'Auth\AuthController@getRegister');
    Route::post('auth/register', 'Auth\AuthController@postRegister');

    Route::get('doc/{user_namespace}/{doc_namespace}', 'DocController@doc_data');

    Route::get('/{user_namespace}/shared/{doc_namespace}', function ()
    {
        return view('main');
    });

    Route::get('{user_namespace}/shared', function ()
    {
        return redirect('auth/login');
    });
});
*/

Route::group(['middleware' => ['web']], function ()
{
    Route::get('/', 'DocController@index');
    Route::get('/cvson', 'DocController@cvson');
    Route::resource('doc', 'DocController');

});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/
