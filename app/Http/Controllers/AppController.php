<?php

namespace App\Http\Controllers;

use App\Models\Employee\Department;
use App\Models\Employee\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AppController extends Controller
{
    public function show()
    {
        return response()->json([
            'status' => true,
            'employeeCount' => Employee::select(DB::raw('count(*) as total,count(if(hired=1,1,null)) as hired, count(if(hired=0,1,null)) as waiting'))->get()
        ], 200);
    }
}
