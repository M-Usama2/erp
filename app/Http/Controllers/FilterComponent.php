<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee\Employee;
use App\Models\Employee\Department;
use App\Http\Resources\DepartmentResource;


class FilterComponent extends Controller
{
    function search($name){
        return Employee::where('name', 'LIKE', '%' . $name . '%')->get();
        if(count($result)){
            return Response()->json($result);
           }
           else
           {
           return response()->json(['Result' => 'No Data not found'], 404);
           }
    }
    function DepartmentSearch($title){
        return DepartmentResource::collection(Department::where('title', 'LIKE', '%' . $title . '%')->get());
        if(count($result)){
            return Response()->json($result);
           }
           else
           {
           return response()->json(['Result' => 'No Data not found'], 404);
           }
    }
}
