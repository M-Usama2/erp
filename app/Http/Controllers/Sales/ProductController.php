<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Sales\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $products = ProductResource::collection(Product::all());
            return response()->json([
                'status' => true,
                'data' => $products,
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
                    'name' => 'required|max:160',
                    'price' => 'required',
                    'stock' => 'required',
                    'status' => 'nullable',
                    'description' => 'nullable|max:160',
                    'category_id' => 'required',
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
                'name' => $request->name,
                'price' => $request->price,
                'stock' => $request->stock,
                'category_id' => $request->category_id,
            ];
            if ($request->description) {
                $data["description"] = $request->description;
            }

            $product = Product::create($data);

            return response()->json([
                'status' => true,
                'data' => $product
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
            $product = Product::where('id', $id)->first();
            return response()->json([
                'status' => true,
                'data' => new ProductResource($product),
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
            $product = Product::where('id', $id)->first();
            $product->update($request->all());

            return response()->json([
                'status' => false,
                'data' => $product,
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
            return Product::destroy($id);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
