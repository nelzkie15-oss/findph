<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProjectController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::apiResource('posts', PostController::class)->only(['index', 'show', 'store', 'update', 'destroy']);
Route::apiResource('projects', ProjectController::class)->only(['index', 'show', 'store', 'update', 'destroy']);
Route::apiResource('guests', GuestController::class)->only(['index', 'show', 'store', 'update', 'destroy']);
Route::apiResource('sales', SalesController::class)->only(['index', 'show', 'store', 'update', 'destroy']);
Route::apiResource('contacts', ContactController::class)->only(['index', 'show', 'store', 'update', 'destroy']);

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::get('sumprice', [AuthController::class, 'sumprice']);
Route::get('countprice', [AuthController::class, 'countprice']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('count', [AuthController::class, 'count']);
// Route::get('payment', [AuthController::class, 'payment']);
// Route::get('createCheckout', [AuthController::class, 'createCheckout']);
Route::post('loginadmin', [AuthController::class, 'loginadmin']);
Route::post('adminlogout', [AuthController::class, 'adminlogout'])->middleware('auth:sanctum');
