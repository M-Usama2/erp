<?php

namespace App\Http\Controllers\Expense;

use App\Http\Controllers\Controller;
use App\Models\Expense\Expense;
use App\Models\Expense\ExpenseType;
use Illuminate\Http\Request;

class ExpenseTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $expenses = ExpenseType::all();
        return response()->json([
            'status' => true,
            'data' => $expenses,
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
        $request->validate([
            'name' => 'required',
            'description' => 'required'
        ]);

        $data = ExpenseType::create($request->post());

        return response()->json([
            'status' => true,
            'data' => $data,
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
        $singleData = ExpenseType::where('id', $id)->first();

        if(!$singleData){
            return response()->json([
                'status' => true,
                'message' => 'Expense Not Found!',
            ], 404);
        }

        return response()->json([
            'status' => false,
            'data' => $singleData,
            'message' => 'Expense Found!',
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
        $updateData = ExpenseType::find($id);
        $updateData->update($request->all());
        return response()->json([
            'status' => false,
            'data' => $updateData,
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
        return ExpenseType::destroy($id);
    }
}
