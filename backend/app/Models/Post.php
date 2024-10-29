<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'posts';
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'file',
        'price',
        'link',
        'videos',
        'status'
       ];


    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class);

}
}
