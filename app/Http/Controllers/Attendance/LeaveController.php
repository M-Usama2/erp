<?php

namespace App\Http\Controllers\Attendance;

use App\Http\Controllers\Controller;
use App\Http\Resources\LeaveResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Attendance\Leave;

class LeaveController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $leaves = Leave::all();
        return response()->json([
            'status' => true,
            'leaves' => LeaveResource::collection($leaves),
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
        if (!$request->user()->can('add leave')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        try {
            //code...
            $validateLeave = Validator::make(
                $request->all(),
                [
                    'reason' => 'required|max:160',
                    'number_of_leaves' => 'required|integer',
                ]
            );

            if ($validateLeave->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateLeave->errors()
                ], 401);
            }

            $leave = Leave::create(array(
                'reason' => $request->reason,
                'number_of_leaves' => $request->number_of_leaves,
            ));

            return response()->json([
                'status' => true,
                'message' => 'updated!',
                'leaves' => $leave,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $leave = Leave::where('id', $id)->first();
        if ($leave) {
            return response()->json([
                'status' => true,
                'leave' => new LeaveResource($leave),
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'error' => '404 Leave not found!',
            ], 404);
        }
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
        if (!$request->user()->can('edit leave')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $leave = Leave::where('id', $id)->first();
        if ($leave) {
            $validateLeave = Validator::make(
                $request->all(),
                [
                    'reason' => 'required|max:160',
                    'number_of_leaves' => 'required|integer',
                ]
            );

            if ($validateLeave->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateLeave->errors()
                ], 401);
            }
            $leave->update(array(
                'reason' => $request->reason,
                'number_of_leaves' => $request->number_of_leaves,
            ));
            return response()->json([
                'status' => true,
                'message' => 'updated!',
                'leave' => $leave,
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'error' => '404 Leave not found!',
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        if (!$request->user()->can('delete leave')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $leave = Leave::where('id', $id)->first();
        if ($leave) {
            $leave->delete();
            return response()->json([
                'status' => true,
                'message' => 'Leave Deleted!',
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'error' => '404 Leave not found!',
            ], 404);
        }
    }
}
