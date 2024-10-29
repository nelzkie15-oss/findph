<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class GuestController extends Controller
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
        $perPage = $request->input('perPage', 12);

        $results = Post::where('posts.title', 'LIKE', "%{$query}%")
                    ->select(
                        'posts.*',
                        'users.name as post_name',
                        )
                     ->leftjoin('users', 'posts.user_id', '=', 'users.id')
                     ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($results);

    }


    public function store(Request $request)
    {
        //
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
