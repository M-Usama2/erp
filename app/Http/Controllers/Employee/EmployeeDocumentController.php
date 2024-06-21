<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Employee\Employee;
use App\Models\Employee\EmployeeDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EmployeeDocumentController extends Controller
{
    public function show($id)
    {
        try {
            $documents = EmployeeDocument::where('employee_id', $id)->first();
            return response()->json([
                'status' => true,
                'data' => $documents,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function store(Request $request, $id = 0)
    {

        $employee = Employee::where('id', $id)->first();

        if (!$employee) {
            return response()->json([
                'status' => false,
                'message' => "Employee not found!"
            ], 404);
        }
        $document['employee_id'] = $employee->id;

        try {
            $validateEmployee = Validator::make(
                $request->all(),
                [
                    'title' => 'required|max:160',
                    'description' => 'nullable',
                    'document' => 'required|mimes:jpg,png,jpeg,docx,pdf,txt',
                ]
            );

            if ($validateEmployee->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateEmployee->errors()
                ], 401);
            }

            $document['title'] = $request->title;
            $document['description'] = $request->description;
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }


        if (!empty($request->document)) {
            try {
                $documentFile = $request->file('document');
                $filename = time() . '.' . $documentFile->getClientOriginalExtension();
                $path = $request->document->storeAs('employees/documents', $filename);
                $document['document'] = $path;

                return response()->json([
                    'data' => EmployeeDocument::create($document),
                    'status' => true,
                    'message' => 'Document Added',
                ], 200);
            } catch (\Throwable $th) {
                return response()->json([
                    'status' => false,
                    'message' => $th->getMessage()
                ], 500);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => "Document have not been attached!"
            ], 404);
        }
    }

    public function delete(Request $request, $id = 0)
    {
        $employee = EmployeeDocument::where('id', $id)->first();

        try {
            if ($employee) {
                Storage::disk(env('FILESYSTEM_DISK', 'local'))->delete($employee->document);
                $employee->delete();
                return response()->json([
                    'status' => true,
                    'message' => 'Successfully deleted!',
                ], 200);
            } else if ($id == 0) {
                if (!empty($request->deleted)) {
                    EmployeeDocument::destroy($request->deleted);
                    return response()->json([
                        'status' => true,
                        'message' => 'Successfully deleted!',
                    ], 200);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Not Found!',
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
