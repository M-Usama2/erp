<?php

namespace App\Http\Controllers;

use App\Models\EmailTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmailTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $templates = EmailTemplate::all();
        return response()->json([
            'status' => true,
            'templates' => $templates,
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
        try {
            //code...
            $validateTemplate = Validator::make(
                $request->all(),
                [
                    'title' => 'required|max:160',
                    'template' => 'required'
                ]
            );

            if ($validateTemplate->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateTemplate->errors()
                ], 401);
            }

            $template = EmailTemplate::create(array(
                'title' => $request->title,
                'template' => $request->template
            ));

            return response()->json([
                'status' => true,
                'message' => 'updated!',
                'templates' => $template,
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
        $template = EmailTemplate::where('id', $id)->first();
        if ($template) {
            return response()->json([
                'status' => true,
                'template' => $template,
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'error' => '404 Template not found!',
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
        $template = EmailTemplate::where('id', $id)->first();
        if ($template) {
            $validateTemplate = Validator::make(
                $request->all(),
                [
                    'title' => 'required|max:160',
                    'template' => 'required'
                ]
            );

            if ($validateTemplate->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateTemplate->errors()
                ], 401);
            }
            $template->update(array(
                'title' => $request->title,
                'template' => $request->template
            ));
            return response()->json([
                'status' => true,
                'message' => 'updated!',
                'templates' => $template,
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'error' => '404 Template not found!',
            ], 404);
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
        $template = EmailTemplate::where('id', $id)->first();
        if ($template) {
            $template->delete();
            return response()->json([
                'status' => true,
                'message' => 'Template Deleted!',
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'error' => '404 Template not found!',
            ], 404);
        }
    }
}
