<?php

namespace App\Http\Controllers\Attendance;

use App\Http\Controllers\Controller;
use App\Http\Resources\LeaveRequestResource;
use App\Models\Attendance\LeaveRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LeaveRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Filters
        $search = $request->search;
        $status = $request->status;
        $start_date = $request->start_date;
        $end_date = $request->end_date;
        
        $leaveRequests = LeaveRequest::with('employee')->where(function ($query) use ($search, $status, $start_date, $end_date) {
            if ($search) {
                $query->where('reason', 'like', '%' . $search . '%');
            }
            if ($status) {
                $query->where('status', $status);
            }
            if ($start_date) {
                $query->where('start_date', '>=', $start_date);
            }
            if ($end_date) {
                $query->where('end_date', '<=', $end_date);
            }
        })->orderBy('id', 'desc')->get();

        return response()->json([
            'status' => true,
            'message' => 'records Found!',
            'leaves' => LeaveRequestResource::collection($leaveRequests),
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
        $validated = Validator::make($request->all(), [
            'employee_id' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'reason' => 'required',
        ]);
        if ($validated->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'validation failed!',
                'errors' => $validated->errors(),
            ], 400);
        }
        $leaveRequest = LeaveRequest::create($request->all());
        return response()->json([
            'status' => true,
            'message' => 'created!',
            'leaves' => new LeaveRequestResource($leaveRequest),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $leaveRequest = LeaveRequest::find($id);
        return response()->json([
            'status' => true,
            'message' => 'record Found!',
            'leaves' => new LeaveRequestResource($leaveRequest),
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
        LeaveRequest::where('id', $id)->update($request->all());
        $leaveRequest = LeaveRequest::find($id);
        return response()->json([
            'status' => true,
            'message' => 'updated!',
            'leaves' => new LeaveRequestResource($leaveRequest),
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
        LeaveRequest::destroy($id);
        return response()->json([
            'status' => true,
            'message' => 'deleted!',
        ], 200);
    }

    public function approve(Request $request, $id)
    {
        $leaveRequest = LeaveRequest::find($id);
        $leaveRequest->update([
            'status' => 'approved',
            'approved_by' => auth()->user()->id,
            'comment' => $request->comment,
        ]);
        return response()->json([
            'status' => true,
            'message' => 'approved!',
            'leaves' => new LeaveRequestResource($leaveRequest),
        ], 200);
    }

    public function reject(Request $request, $id)
    {
        $leaveRequest = LeaveRequest::find($id);
        $leaveRequest->update([
            'status' => 'rejected',
            'rejected_by' => auth()->user()->id,
            'comment' => $request->comment,
        ]);
        return response()->json([
            'status' => true,
            'message' => 'rejected!',
            'leaves' => new LeaveRequestResource($leaveRequest),
        ], 200);
    }
}
