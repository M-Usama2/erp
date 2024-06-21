<?php

namespace App\Http\Controllers\HelpDesk;

use App\Http\Controllers\Controller;
use App\Models\HelpDesk\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $customers = Customer::all();
        
        return response()->json([
            'status' => true,
            'customers' => $customers
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
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'address' => 'required|string',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors(),
            ], 400);
        }
        $customer = Customer::create($request->all());
        
        return response()->json([
            'status' => true,
            'customer' => $customer
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
        $customer = Customer::find($id);
        
        if (!$customer) {
            return response()->json([
                'status' => false,
                'message' => 'Customer not found'
            ], 404);
        }
        
        return response()->json([
            'status' => true,
            'customer' => $customer
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
        $customer = Customer::find($id);
        
        if (!$customer) {
            return response()->json([
                'status' => false,
                'message' => 'Customer not found'
            ], 404);
        }
        
        $validate = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'address' => 'required|string',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors(),
            ], 400);
        }
        
        $customer->update($request->all());
        
        return response()->json([
            'status' => true,
            'customer' => $customer
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
        $customer = Customer::find($id);
        
        if (!$customer) {
            return response()->json([
                'status' => false,
                'message' => 'Customer not found'
            ], 404);
        }
        
        $customer->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Customer deleted successfully'
        ], 200);
    }
}
