<?php

namespace App\Http\Controllers\Expense;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExpenseResource;
use App\Models\Expense\Expense;
use App\Models\Expense\ExpenseType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $expense = ExpenseResource::collection(Expense::all());

            return response()->json([
                'status' => true,
                'data' => $expense,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {

            $validateExpense = Validator::make(

                $request->all(),
                [
                    'expense_type_id' => 'required',
                    'amount' => 'required',
                    'status' => 'nullable',
                    'user_id' => 'nullable',
                    'note' => 'nullable',
                ]
            );

            if ($validateExpense->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateExpense->errors()
                ], 401);
            }
            $data = [
                'expense_type_id' => $request->expense_type_id,
                'amount' => $request->amount,
                'status' => 'PEINDING',
                'user_id' => $request->user()->id,
                'note' => ''
            ];
            $expense = Expense::create($data);

            return response()->json([
                'status' => true,
                'data' => $expense
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
    public function show($id)
    {

        try {
            $expense = Expense::where('id', $id)->first();

            if (!$expense) {
                return response()->json([
                    'status' => false,
                    'message' => 'Expense Not Found'
                ], 404);
            }

            return response()->json([
                'status' => true,
                'data' => new ExpenseResource($expense)
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
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

        try {
            $expense = Expense::where('id', $id)->first();
            $expense->update($request->all());

            return response()->json([
                'status' => false,
                'data' => $expense,
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
    public function destroy($id)
    {
        try {
            return Expense::destroy($id);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function setStatus(Request $request, $id)
    {
        try {
            $expense = Expense::where('id', $id)->first();
            $expense->status = $request->status;
            $expense->save();
            return response()->json([
                'status' => true,
                'message' => "staus Updated"
            ], 200);
            //code...
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
