<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Post;
use App\Models\Sale;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{


//     function createPaymentIntent($amount, $currency = 'PHP'){


//     $url = 'https://api.paymongo.com/v1/links';

//         // Your PayMongo secret key
//         $apiKey = getenv('PAYMONGO_SECRET_KEY');

//         // Initialize cURL
//         $ch = curl_init($url);

//         // Set cURL options
//         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//         curl_setopt($ch, CURLOPT_POST, true);
//         curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
//             'amount' => 1000, // Amount in cents
//             'currency' => 'PHP',
//             'payment_method_types' => ['card']
//         ]));
//         curl_setopt($ch, CURLOPT_HTTPHEADER, [
//             'Content-Type: application/json',
//             'Authorization: Basic ' . base64_encode($apiKey),
//             'accept' => 'application/json',
//         ]);

// // Execute the request
// $response = curl_exec($ch);

// // Check for errors
// if (curl_errno($ch)) {
//     echo 'Error:' . curl_error($ch);
// } else {
//     // Decode the JSON response
//     $responseData = json_decode($response, true);
//     print_r($responseData);
// }

// // Close cURL session
// curl_close($ch);

// }


    public function register(Request $request){
        $data = $request->validate([
            'name' => 'required|min:3|regex:/^([a-zA-Z\s\-\+\/\(\)]*)$/',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed'
        ]);
       $user = User::create($data);
    //    $token = $user->createToken($request->name);
       return [
            'user' => $user,
            // 'token' => $token
       ];
    }


    public function login(Request $request)
    {

        $credentials = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password, 'role' => 0])) {
            $user = Auth::user();
            $userid = Auth::user()->id;
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json(['status' =>200, 'access_token' => $token, 'user_id' => $userid, 'token_type' => 'Bearer']);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return [
            'message' => "You are are logged out!",
        ];
    }


    public function loginadmin(Request $request)
    {

        $credentials = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password, 'role' => 1])) {
            $user = Auth::user();
            $userid = Auth::user()->id;
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json(['status' =>200, 'access_token' => $token, 'user_id' => $userid, 'token_type' => 'Bearer']);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }


    public function adminlogout(Request $request){
        $request->user()->tokens()->delete();
        return [
            'message' => "You are are logged out!",
        ];
    }


    public function count(Request $request)
    {

        $sessionId = $request->header('_user_id');
        $query = Post::query();
        if ($sessionId) {
            $query->where('user_id', $sessionId);
        }
        $count = $query->count();
        return response()->json(['count' => $count]);

    }


    public function sumprice(Request $request)
    {
        $user_id = $request->input('user_id');
        $sum = Sale::where('seller_id', $user_id)->sum('price');
        return response()->json([
            'sum' => $sum,
        ]);
    }


    public function countprice(Request $request)
    {
        $user_id = $request->input('user_id');
        $count = Sale::where('seller_id', $user_id)->count('price');
        return response()->json([
            'count' => $count,
        ]);
    }


}
