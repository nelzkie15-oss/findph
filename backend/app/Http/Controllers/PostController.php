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

class PostController extends Controller
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
        $perPage = $request->input('perPage', 10);

        $results = Post::where('user_id', $user_id)
                        ->where('title', 'LIKE', "%{$query}%")
                        ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($results);

    }

    public function store(Request $request)
    {

        $data = $request->validate([
            'user_id' => '',
            'title' => 'required',
            'description' => 'required',
            'file' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048',
            'price' => 'required',
            'link' => 'required',
        ]);
        if ($request->hasFile('file')) {
                $file = $request->file('file');
                $originalName = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $fileName = Str::random(10) . '.' . $extension;
                $file->storeAs('public/uploads', $fileName);

                $post = new Post;
                $post->user_id = $request->user_id;
                $post->title = $request->title;
                $post->description = $request->description;
                $post->file = $fileName;
                $post->price = $request->price;
                $post->link = $request->link;
                $post->videos = NULL;
                $post->status =  NULL;
                $post->save();

            return response()->json(['message' => 'Insert Post successfully!', 'data' => $data], 200);

        }
    }


    public function show($id)
    {
        $item = Post::find($id);
        return response()->json($item);

    }


    public function update(Request $request, Post $post)
    {

        $data = $request->validate([
            'user_id' => '',
            'title' => 'required',
            'description' => 'required',
            'file' => 'nullable',
            'price' => 'required',
            'link' => 'required',
        ]);

        $post = Post::find($request->id);
        $post->user_id = $request->input('user_id');
        $post->title = $request->input('title');
        $post->description = $request->input('description');
        $post->file = $request->input('file');
        $post->price = $request->input('price');
        $post->link = $request->input('link');
        $post->save();

        return response()->json(['message' => 200, 'post' => $post, 'user' => $emp->user, 'data' => $data]);
    }


    public function destroy(Post $post)
    {
        //Gate::authorize('modify', $post);

        $data = $post->delete();

        return ["message" => "Deleted Post Successfully"];
    }


}
