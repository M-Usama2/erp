<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\Controller;
use App\Http\Resources\SaleResource;
use App\Models\Sales\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $sales = SaleResource::collection(Sale::all());
            return response()->json([
                'status' => true,
                'data' => $sales,
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
            $validateGroup = Validator::make(
                $request->all(),
                [
                    'customer' => 'required|max:160',
                    'quantity' => 'required',
                    'description' => 'nullable|max:160',
                    'product_id' => 'required',
                ]
            );

            if ($validateGroup->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateGroup->errors()
                ], 401);
            }

            $data = [
                'customer' => $request->customer,
                'quantity' => $request->quantity,
                'product_id' => $request->product_id
            ];
            if ($request->has('description')) {
                $data[] = $request->description;
            }

            $sale = Sale::create($data);

            return response()->json([
                'status' => true,
                'data' => $sale
            ], 200);
            //code...
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
            $sale = Sale::where('id', $id)->first();
            return response()->json([
                'status' => true,
                'data' => new SaleResource($sale),
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
            $sale = Sale::where('id', $id)->first();
            $sale->update($request->all());

            return response()->json([
                'status' => false,
                'data' => $sale,
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
            return Sale::destroy($id);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
