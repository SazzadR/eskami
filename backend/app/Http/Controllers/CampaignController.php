<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Illuminate\Http\Request;

class CampaignController extends Controller
{
    public function index()
    {
        return Campaign::orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $campaign = Campaign::create($request->all());

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
