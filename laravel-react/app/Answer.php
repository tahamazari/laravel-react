<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $table = 'answers';

    public $primary_key = 'answer_id';

    public $timestamps = true;
    
    protected $fillable = ['question_text', 'user_id', 'answer_text'];
}
