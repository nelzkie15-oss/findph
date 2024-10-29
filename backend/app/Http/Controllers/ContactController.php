<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Post;
use App\Models\Sale;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class ContactController extends Controller
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

        $results = Contact::where('user_id', $user_id)
                        ->where('full_name', 'LIKE', "%{$query}%")
                        ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($results);

    }
    public function store(Request $request)
    {

        $data = $request->validate([
            'user_id' => '',
            'profile' => 'nullable|mimes:jpeg,png,jpg,gif|max:2048',
            'full_name' => 'required',
            'contact_number' => 'required',
            'email' => 'required',
            'address' => 'required',
            'age' => 'required',
            'skill' => '',
            'website_link' => '',
            'socialmedia_link' => '',
            'jobs' => 'required',
        ]);
        if ($request->hasFile('profile')) {
                $file = $request->file('profile');
                $originalName = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $fileName = Str::random(10) . '.' . $extension;
                $file->storeAs('public/uploads', $fileName);

                $con = new Contact;
                $con->user_id = $request->user_id;
                $con->profile = $fileName;
                $con->full_name = $request->full_name;
                $con->contact_number = $request->contact_number;
                $con->email = $request->email;
                $con->address = $request->address;
                $con->age = $request->age;
                $con->skill = $request->skill;
                $con->website_link = $request->website_link;
                $con->socialmedia_link = $request->socialmedia_link;
                $con->jobs = $request->jobs;
                $con->save();

            return response()->json(['message' => 'Insert Contact successfully!', 'data' => $data], 200);

        }
    }

    public function show($id)
    {
        $item = Contact::find($id);
        return response()->json($item);

    }


    public function update(UpdateContactRequest $request, Contact $contact)
    {
        //
    }


    public function destroy(Contact $contact)
    {
        //Gate::authorize('modify', $post);

        $data = $contact->delete();

        return ["message" => "Deleted Contact Successfully"];
    }

}
