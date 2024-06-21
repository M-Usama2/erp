<?php

namespace App\Http\Controllers\HelpDesk;

use App\Http\Controllers\Controller;
use App\Http\Resources\TicketResource;
use App\Models\HelpDesk\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Filters
        $status = $request->status;
        $priority = $request->priority;
        $search = $request->search;
        $created_at = $request->created_at;
        $tickets = Ticket::when($status, function ($query, $status) {
            return $query->where('status', $status);
        })->when($priority, function ($query, $priority) {
            return $query->where('priority', $priority);
        })->when($search, function ($query, $search) {
            return $query->where('title', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%');
        })->when($created_at, function ($query, $created_at) {
            return $query->whereDate('created_at', $created_at);
        })->orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => true,
            'tickets' => TicketResource::collection($tickets),
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
            'status' => 'nullable|string',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors(),
            ], 400);
        }
        $data = array(
            'title' => $request->title,
            'description' => $request->description,
            'user_id' => $request->user()->id,
        );

        Ticket::create($data);
        return response()->json([
            'status' => true,
            'message' => 'Ticket created successfully',
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
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json([
                'status' => false,
                'message' => 'Ticket not found',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'tickets' => new TicketResource($ticket),
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
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json([
                'status' => false,
                'message' => 'Ticket not found',
            ], 404);
        }

        $validate = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|string',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors(),
            ], 400);
        }

        $ticket->update($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Ticket updated successfully',
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
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json([
                'status' => false,
                'message' => 'Ticket not found',
            ], 404);
        }

        $ticket->delete();
        return response()->json([
            'status' => true,
            'message' => 'Ticket deleted successfully',
        ], 200);
    }

    public function comment(Request $request, $id)
    {
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json([
                'status' => false,
                'message' => 'Ticket not found',
            ], 404);
        }

        $validate = Validator::make($request->all(), [
            'comment' => 'required|string',
            'status' => 'required|string',
            'priority' => 'required|string',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors(),
            ], 400);
        }

        $data = array(
            'comment' => $request->comment,
            'status' => $request->status,
            'user_id' => $request->user()->id,
            'priority' => $request->priority,
        );

        $ticket->comments()->create($data);
        $ticket->update(['status' => $request->status, 'priority' => $request->priority]);
        return response()->json([
            'status' => true,
            'message' => 'Comment added successfully',
        ], 201);
    }

    public function comments($id)
    {
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json([
                'status' => false,
                'message' => 'Ticket not found',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'tickets' => $ticket->comments,
        ], 200);
    }

    public function close($id)
    {
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json([
                'status' => false,
                'message' => 'Ticket not found',
            ], 404);
        }

        $ticket->update(['status' => 'closed']);
        return response()->json([
            'status' => true,
            'message' => 'Ticket closed successfully',
        ], 200);
    }

    public function open($id)
    {
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json([
                'status' => false,
                'message' => 'Ticket not found',
            ], 404);
        }

        $ticket->update(['status' => 'open']);
        return response()->json([
            'status' => true,
            'message' => 'Ticket opened successfully',
        ], 200);
    }
    
}
