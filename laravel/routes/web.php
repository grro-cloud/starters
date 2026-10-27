<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/hello', function (Request $request) {
    $name = $request->query('name', 'there');

    return ['message' => "Hello {$name}, from Laravel on Grro."];
});
