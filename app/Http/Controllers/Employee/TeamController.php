<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Http\Resources\TeamResource;
use App\Models\Employee\EmployeeTeam;
use App\Models\Employee\EmployeeTeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $teams = EmployeeTeam::all();
        return response()->json([
            'status' => true,
            'teams' => TeamResource::collection($teams),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors(),
            ], 400);
        }
        EmployeeTeam::create($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Team created successfully',
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $team = EmployeeTeam::find($id);
        if (!$team) {
            return response()->json([
                'status' => false,
                'message' => 'Team not found',
            ], 404);
        }
        return response()->json([
            'status' => true,
            'team' => new TeamResource($team),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $team = EmployeeTeam::find($id);
        if (!$team) {
            return response()->json([
                'status' => false,
                'message' => 'Team not found',
            ], 404);
        }
        $validate = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors(),
            ], 400);
        }
        $team->update($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Team updated successfully',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $team = EmployeeTeam::find($id);
        if (!$team) {
            return response()->json([
                'status' => false,
                'message' => 'Team not found',
            ], 404);
        }
        $team->delete();
        return response()->json([
            'status' => true,
            'message' => 'Team deleted successfully',
        ], 200);
    }

    /**
     * Add member to team
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function addMember(Request $request,$team_id)
    {
        $validate = Validator::make($request->all(), [
            'employee_id' => 'required|integer',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors(),
            ], 400);
        }
        $team = EmployeeTeam::find($team_id);
        if (!$team) {
            return response()->json([
                'status' => false,
                'message' => 'Team not found',
            ], 404);
        }
        $team->addMember($request->employee_id);
        return response()->json([
            'status' => true,
            'message' => 'Member added to team successfully',
        ], 200);
    }

    /**
     * Remove member from team
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function removeMember($team_id,$employee_id)
    {
        EmployeeTeamMember::where('employee_id',$employee_id)->where('employee_team_id',$team_id)->delete();
        return response()->json([
            'status' => true,
            'message' => 'Member removed from team successfully',
        ], 200);
    }
}
