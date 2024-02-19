<?php

declare(strict_types=1);

use App\Http\Resources\UserResource;
use App\Models\User;
use Entities\Message\Controller\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', static function (Request $request) {
        return UserResource::collection(User::all()->except(auth()->user()->id));
    });

    Route::post('/save-message/{user}', [MessageController::class, 'store']);
    Route::get('/get-user/{user}', [MessageController::class, 'getMessages']);
});
