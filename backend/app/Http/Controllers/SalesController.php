<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Sale;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class SalesController extends Controller
{
    public static function middleware(){
        return [
            new Middleware('auth:sanctum', except: ['index','show']),
        ];
    }

    public function index(Request $request)
    {
        $user_id = $request->input('user_id');
        $query = $request->input('query');
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 100000);

        $results = Sale::where('sales.seller_id', $user_id)
        ->select(
            'sales.*',
             'users.name as buyer_name',
             )
        ->leftjoin('users', 'sales.buyer_id', '=', 'users.id')
        ->where('sales.title', 'LIKE', "%{$query}%")
        ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($results);

    }

    public function store(Request $request)
    {

    }

    public function show(string $id)
    {
        //
    }


    public function update(Request $request, string $id)
    {
        //
    }


    public function destroy(string $id)
    {
        //
    }
}
