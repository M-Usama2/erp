<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use App\Models\Payroll\PayHead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PayHeadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (!$request->user()->can('view payhead')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $payheads = PayHead::all();
        return response()->json([
            'status' => true,
            'payheads' => $payheads,
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
        if (!$request->user()->can('add payhead')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        try {
            //code...
            $validatePayHead = Validator::make(
                $request->all(),
                [
                    'name' => 'required|max:160',
                    'description' => 'nullable',
                    'deduction' => 'nullable',
                    'default_pay' => 'nullable',
                ]
            );

            if ($validatePayHead->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validatePayHead->errors()
                ], 401);
            }

            $data_array = array(
                'name' => $request->name,
            );

            if (!empty($request->description)) {
                $data_array['description'] = $request->description;
            }

            if (!empty($request->deduction)) {
                $data_array['deduction'] = $request->deduction;
            }

            if (!empty($request->default_pay)) {
                $data_array['default_pay'] = $request->default_pay;
            }

            $payhead = PayHead::create($data_array);

            return response()->json([
                'status' => true,
                'message' => 'Saved!',
                'payheads' => $payhead,
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
        if (!$request->user()->can('view payhead')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $payhead = PayHead::where('id', $id)->first();
        if ($payhead) {
            return response()->json([
                'status' => true,
                'payhead' => $payhead,
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'error' => '404 Payhead not found!',
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
        if (!$request->user()->can('edit payhead')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $payhead = PayHead::where('id', $id)->first();
        if (!$payhead) {
            return response()->json([
                'status' => false,
                'error' => '404 Payhead not found!',
            ], 404);
        }
        try {
            //code...
            $validatePayHead = Validator::make(
                $request->all(),
                [
                    'name' => 'required|max:160',
                    'description' => 'nullable',
                    'deduction' => 'nullable',
                    'default_pay' => 'nullable',
                ]
            );

            if ($validatePayHead->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validatePayHead->errors()
                ], 401);
            }

            $data_array = array(
                'name' => $request->name,
            );

            if (!empty($request->description)) {
                $data_array['description'] = $request->description;
            }

            if (!empty($request->deduction)) {
                $data_array['deduction'] = $request->deduction;
            } else {
                $data_array['deduction'] = 0;
            }

            if (!empty($request->default_pay)) {
                $data_array['default_pay'] = $request->default_pay;
            }

            $payhead->update($data_array);

            return response()->json([
                'status' => true,
                'message' => 'updated!',
                'payheads' => $payhead,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
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
        if (!$request->user()->can('delete payhead')) {
            return response()->json([
                'status' => false,
                'message' => 'Your request is Forbidden!',
            ], 403);
        }
        $payhead = PayHead::where('id', $id)->first();
        if ($payhead) {
            $payhead->delete();
            return response()->json([
                'status' => true,
                'message' => 'Payhead Deleted!',
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'error' => '404 Payhead not found!',
            ], 404);
        }
    }
}
