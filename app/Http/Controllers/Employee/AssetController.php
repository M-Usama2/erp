<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Http\Resources\AssetResource;
use App\Models\Employee\AssignedAsset;
use App\Models\Employee\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;


class AssetController extends Controller
{
    public function show($id = null)
    {
        try {
            if ($id) {
                $asset = AssignedAsset::where('id', $id)->first();
                return response()->json([
                    'status' => true,
                    'asset' => new AssetResource($asset),
                ], 200);
            } else {
                $assets = AssignedAsset::all();
                return response()->json([
                    'status' => true,
                    'assets' => AssetResource::collection($assets),
                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validateEmployee = Validator::make(
                $request->all(),
                [
                    'name' => 'required|max:160',
                    'identity' => 'nullable|max:160',
                    'description' => 'nullable',
                    'cost' => 'nullable',
                    'document' => 'nullable|mimes:jpg,png,jpeg,docx,pdf,txt',
                ]
            );

            if ($validateEmployee->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateEmployee->errors()
                ], 401);
            }

            $asset['name'] = $request->name;
            if (!empty($request->description))
                $asset['description'] = $request->description;
            if (!empty($request->cost))
                $asset['cost'] = $request->cost;
            if (!empty($request->identity))
                $asset['identity'] = $request->identity;

            if (!empty($request->document)) {
                try {
                    $assetFile = $request->file('document');
                    $filename = time() . '.' . $assetFile->getClientOriginalExtension();
                    $path = $request->document->storeAs('employees/asset', $filename);
                    $asset['document'] = $path;
                } catch (\Throwable $th) {
                    return response()->json([
                        'status' => false,
                        'message' => $th->getMessage()
                    ], 500);
                }
            }

            return response()->json([
                'asset' => AssignedAsset::create($asset),
                'status' => true,
                'message' => 'Asset Added',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function delete(Request $request, $id = 0)
    {
        $asset = AssignedAsset::where('id', $id)->first();

        try {
            if ($asset) {
                Storage::disk(env('FILESYSTEM_DISK', 'local'))->delete($asset->document);
                $asset->delete();
                return response()->json([
                    'status' => true,
                    'message' => 'Successfully deleted!',
                ], 200);
            } else if ($id == 0) {
                if (!empty($request->deleted)) {
                    AssignedAsset::destroy($request->deleted);
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
