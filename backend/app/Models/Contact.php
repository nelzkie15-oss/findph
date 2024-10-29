<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'user_id',
        'profile',
        'full_name',
        'contact_number',
        'email',
        'address',
        'age',
        'project_lists',
        'skill',
        'website_link',
        'socialmedia_link',
        'jobs'
       ];

    use HasFactory;
}
