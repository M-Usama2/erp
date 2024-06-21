<?php

namespace App\Http\Controllers\Attendance;

use App\Http\Controllers\Controller;
use App\Http\Resources\HolidayResource;
use App\Models\Attendance\Holiday;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HolidayController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $holidays = Holiday::all();
        return response()->json([
            'status' => true,
            'holidays' => HolidayResource::collection($holidays),
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
        if (!$request->user()->can('add holiday')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        try {
            //code...
            $validateHoliday = Validator::make(
                $request->all(),
                [
                    'occasion' => 'required|max:160',
                    'dated' => 'required'
                ]
            );

            if ($validateHoliday->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateHoliday->errors()
                ], 401);
            }

            $holiday = Holiday::create(array(
                'occasion' => $request->occasion,
                'dated' => $request->dated
            ));

            return response()->json([
                'status' => true,
                'message' => 'updated!',
                'holidays' => $holiday,
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
        $holiday = Holiday::where('id', $id)->first();
        if ($holiday) {
            return response()->json([
                'status' => true,
                'holiday' => new HolidayResource($holiday),
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'error' => '404 Holiday not found!',
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
        if (!$request->user()->can('edit holiday')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $holiday = Holiday::where('id', $id)->first();
        if ($holiday) {
            $validateHoliday = Validator::make(
                $request->all(),
                [
                    'occasion' => 'required|max:160',
                    'dated' => 'required'
                ]
            );

            if ($validateHoliday->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateHoliday->errors()
                ], 401);
            }
            $holiday->update(array(
                'occasion' => $request->occasion,
                'dated' => $request->dated
            ));
            return response()->json([
                'status' => true,
                'message' => 'updated!',
                'holidays' => $holiday,
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'error' => '404 Holiday not found!',
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
        if (!$request->user()->can('delete holiday')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $holiday = Holiday::where('id', $id)->first();
        if ($holiday) {
            $holiday->delete();
            return response()->json([
                'status' => true,
                'message' => 'Holiday Deleted!',
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'error' => '404 Holiday not found!',
            ], 404);
        }
    }
}
