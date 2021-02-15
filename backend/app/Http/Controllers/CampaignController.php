<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CampaignController extends Controller
{
    public function index()
    {
        return Campaign::with('creatives')->orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'name' => 'required|max:100',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'total_budget' => 'required|numeric',
            'daily_budget' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response($validator->errors(), 400);
        }

        $campaign = Campaign::create($request->all());

        $campaign->createCreatives($request->get('images'));

        return response()->json($campaign, 201);
    }

    public function show(Campaign $campaign)
    {
        return $campaign;
    }

    public function update(Request $request, Campaign $campaign)
    {
        $campaign = Campaign::update($request->all());

        return response()->json($campaign, 200);
    }

    public function destroy(Campaign $campaign)
    {
        $campaign->delete();

        return response()->json(null, 204);
    }
}
