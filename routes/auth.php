<?php

declare(strict_types=1);

use Entities\Auth\Controller\AuthController;
use Entities\Register\Controller\RegisterController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all routes related to Auth for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', AuthController::class)
    ->middleware('throttle:5,1')
    ->name('user-login');

Route::post('register', RegisterController::class)
    ->middleware('throttle:5,1')
    ->name('user-register');

