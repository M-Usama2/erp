<?php

namespace App\Http\Controllers\HelpDesk;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\HelpDesk\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projects = Project::all();
        return response()->json([
            'status' => true,
            'projects' => ProjectResource::collection($projects),
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
            'name' => 'required|string',
            'description' => 'required|string',
            'customer_id' => 'required|integer',
            'status' => 'nullable|string',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors(),
            ], 400);
        }
        $project = Project::create($request->all());
        return response()->json([
            'status' => true,
            'project' => new ProjectResource($project),
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
        $project = Project::find($id);
        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found',
            ], 404);
        }
        return response()->json([
            'status' => true,
            'project' => new ProjectResource($project),
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
        $project = Project::find($id);
        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found',
            ], 404);
        }
        $validate = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'customer_id' => 'required|integer',
            'status' => 'nullable|string',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors(),
            ], 400);
        }
        $project->update($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Project updated successfully',
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
        $project = Project::find($id);
        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found',
            ], 404);
        }
        $project->delete();
        return response()->json([
            'status' => true,
            'message' => 'Project deleted successfully',
        ], 200);
    }

    public function addMilestone(Request $request, $id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found',
            ], 404);
        }
        $validate = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'due_date' => 'required|date',
            'status' => 'nullable|string',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors(),
            ], 400);
        }
        $project->milestones()->create($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Milestone added to project successfully',
        ], 200);
    }

    public function removeMilestone($id, $milestoneId)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found',
            ], 404);
        }
        $milestone = $project->milestones()->find($milestoneId);
        if (!$milestone) {
            return response()->json([
                'status' => false,
                'message' => 'Milestone not found',
            ], 404);
        }
        $milestone->delete();
        return response()->json([
            'status' => true,
            'message' => 'Milestone removed from project successfully',
        ], 200);
    }

    public function team($id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found',
            ], 404);
        }
        return response()->json([
            'status' => true,
            'team' => $project->team,
        ], 200);
    }

    public function addTeam(Request $request, $id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found',
            ], 404);
        }
        $validate = Validator::make($request->all(), [
            'team_id' => 'required|integer',
            'description' => 'nullable|string',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors(),
            ], 400);
        }
        $teamData = [
            'title' => 'Team ' . $project->name,
            'description' => $request->description,
        ];
        $project->team()->create($teamData);
        return response()->json([
            'status' => true,
            'message' => 'Team added to project successfully',
        ], 200);
    }

    public function removeTeam($id, $teamId)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found',
            ], 404);
        }
        $team = $project->team()->find($teamId);
        if (!$team) {
            return response()->json([
                'status' => false,
                'message' => 'Team not found',
            ], 404);
        }
        $team->delete();
        return response()->json([
            'status' => true,
            'message' => 'Team removed from project successfully',
        ], 200);
    }
}
