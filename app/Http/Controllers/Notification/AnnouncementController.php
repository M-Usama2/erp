<?php

namespace App\Http\Controllers\Notification;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnnouncementResource;
use App\Models\Notification\Announcement;
use App\Models\Notification\AnnouncementAttachment;
use App\Models\Notification\AnnouncementEmployees;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $announcements = Announcement::all();
        return response()->json([
            'status' => true,
            'message' => 'records Found!',
            'announcements' => AnnouncementResource::collection($announcements),
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
            'title' => 'required',
            'content' => 'required',
            'dated' => 'required|date',
        ]);
        if ($validated->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'validation failed!',
                'errors' => $validated->errors(),
            ], 400);
        }
        $data = array(
            'title' => $request->title,
            'content' => $request->content,
            'dated' => $request->dated,
            'created_by' => auth()->user()->id,
        );
        $announcement = Announcement::create($data);
        return response()->json([
            'status' => true,
            'message' => 'record created!',
            'announcement' => new AnnouncementResource($announcement),
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
        $announcement = Announcement::find($id);
        return response()->json([
            'status' => true,
            'message' => 'record found!',
            'announcement' => new AnnouncementResource($announcement),
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
        Announcement::where('id', $id)->update($request->all());
        $announcement = Announcement::find($id);
        return response()->json([
            'status' => true,
            'message' => 'record updated!',
            'announcement' => new AnnouncementResource($announcement),
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
        Announcement::destroy($id);
        return response()->json([
            'status' => true,
            'message' => 'record deleted!',
        ], 200);
    }

    public function saveAttachment(Request $request, $announcement_id)
    {
        $validated = Validator::make($request->all(), [
            'file' => 'required',
        ]);
        if ($validated->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'validation failed!',
                'errors' => $validated->errors(),
            ], 400);
        }
        $attachmentData = $request->all();
        $attachmentData['announcement_id'] = $announcement_id;
        // Attachment
        if (!empty($request->photo)) {
            try {
                $photo = $request->file('file');
                $filename = time() . '.' . $photo->getClientOriginalExtension();
                $path = $request->photo->storeAs('attatchments', $filename);
                $attachmentData['file'] =   $path;
            } catch (\Throwable $th) {
                return response()->json([
                    'status' => false,
                    'message' => $th->getMessage()
                ], 500);
            }
        }
        $attachment = AnnouncementAttachment::create($attachmentData);
        return response()->json([
            'status' => true,
            'message' => 'attachment saved!',
            'attachment' => $attachment,
        ], 201);
    }

    public function removeAttachment($id)
    {
        AnnouncementAttachment::destroy($id);
        return response()->json([
            'status' => true,
            'message' => 'attachment deleted!',
        ], 200);
    }

    public function addEmployee(Request $request, $announcement_id)
    {
        $announcement = Announcement::find($announcement_id);
        $announcement->employees()->create([
            'employee_id' => $request->employee_id,
        ]);
        return response()->json([
            'status' => true,
            'message' => 'employee added!',
        ], 200);
    }

    public function removeEmployee($announcement_id, $employee_id)
    {
        AnnouncementEmployees::where('announcement_id', $announcement_id)->where('employee_id', $employee_id)->delete();
        return response()->json([
            'status' => true,
            'message' => 'employee removed!',
        ], 200);
    }

    public function markAsRead($announcement_id, $employee_id)
    {
        AnnouncementEmployees::where('announcement_id', $announcement_id)->where('employee_id', $employee_id)->update([
            'is_read' => 1,
            'read_at' => now(),
        ]);
        return response()->json([
            'status' => true,
            'message' => 'marked as read!',
        ], 200);
    }
}
