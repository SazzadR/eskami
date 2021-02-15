<?php

namespace App\Models;

use App\Models\Creative;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Campaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'start_date', 'end_date', 'total_budget', 'daily_budget'
    ];

    public function creatives()
    {
        return $this->hasMany(Creative::class);
    }

    public function createCreatives($images)
    {
        $creatives = [];

         foreach ($images as $image) {
            $name = uniqid('img_' . strtolower(str_replace(' ', '_', $this->name) . '_'));

            $path = 'images/' . $name . '.jpg';

            \Image::make($image)->save(public_path($path));

            array_push($creatives, new Creative(['path' => $path]));
         }

         $this->creatives()->saveMany($creatives);
    }
}
