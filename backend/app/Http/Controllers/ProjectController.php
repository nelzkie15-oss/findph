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

class ProjectController extends Controller
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

        $results = Post::where('posts.user_id', '!=', $user_id)
                    ->select(
                        'posts.*',
                        'users.name as post_name',
                        )
                     ->leftjoin('users', 'posts.user_id', '=', 'users.id')
                     ->where('posts.title', 'LIKE', "%{$query}%")
                     ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($results);

    }



    public function store(Request $request)
    {
            $user_id = $request->input('user_id');
            $seller_id = $request->input('seller_id');
            $title = $request->input('title');
            $description = $request->input('description');
            $file = $request->input('file');
            $price = $request->input('price');
            $link = $request->input('link');
            $remarks = "Paid";

            $sale = new Sale;
            $sale->buyer_id = $user_id;
            $sale->seller_id = $seller_id;
            $sale->title = $title;
            $sale->description = $description;
            $sale->image = $file;
            $sale->price = $price;
            $sale->payment_status = $remarks;
            $sale->save();

           // dd($amount, $description, $remarks);
              $curl = curl_init();
              $apiKey = getenv('PAYMONGO_SECRET_KEY');

                curl_setopt_array($curl, [
                CURLOPT_URL => 'https://api.paymongo.com/v1/links',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',

                $data = CURLOPT_POSTFIELDS => json_encode([
                    'data' => [
                        'attributes' => [
                            'amount' =>  $price,
                            "currency" => "PHP",
                            'description' => $description,
                            'remarks' => $remarks,
                        ]
                    ]
                ]),
                CURLOPT_HTTPHEADER => [
                    'accept' => 'application/json',
                    'Authorization: Basic ' . base64_encode($apiKey),
                    'content-type' => 'application/json',
            ],

        ]);

        $response = curl_exec($curl);
        $response_ = json_decode($data, true);
        print_r($response_);
        curl_close($curl);
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
