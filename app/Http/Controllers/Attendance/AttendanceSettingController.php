<?php

namespace App\Http\Controllers\Attendance;

use App\Http\Controllers\Controller;
use App\Http\Resources\AttendanceSettingResource;
use App\Models\Attendance\AttendanceSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AttendanceSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->defaultSetting();
        $settings = AttendanceSetting::all();
        return response()->json([
            'status' => true,
            'settings' => AttendanceSettingResource::collection($settings),
        ], 200);
    }

    private function defaultSetting()
    {
        $setting = AttendanceSetting::whereNull('department_id')
            ->whereNull('designation_id')
            ->whereNull('employee_id')
            ->first();
        if (!$setting) {
            AttendanceSetting::create(
                array(
                    'department_id' => null,
                    'designation_id' => null,
                    'employee_id' => null,
                    'check_in' => date('H:i', strtotime('09:00 AM')),
                    'check_out' => date('H:i', strtotime('05:00 PM'))
                )
            );
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
            //code...
            $validateHoliday = Validator::make(
                $request->all(),
                [
                    'department_id' => 'nullable',
                    'designation_id' => 'nullable',
                    'employee_id' => 'nullable',
                    'check_in' => 'required|date_format:H:i',
                    'check_out' => 'required|date_format:H:i',
                ]
            );

            if ($validateHoliday->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateHoliday->errors()
                ], 401);
            }

            if (!empty($request->designation_id)) {
                $settingExist = AttendanceSetting::where('designation_id', $request->designation_id)->first();
                if ($settingExist) {
                    return response()->json([
                        'status' => false,
                        'error' => 'This Setting Already Exsists!',
                    ], 401);
                }
            }

            if (!empty($request->employee_id)) {
                $settingExist = AttendanceSetting::where('employee_id', $request->employee_id)->first();
                if ($settingExist) {
                    return response()->json([
                        'status' => false,
                        'error' => 'This Setting Already Exsists!',
                    ], 401);
                }
            }

            if (!empty($request->department_id)) {
                $settingExist = AttendanceSetting::where('department_id', $request->department_id)->first();
                if ($settingExist) {
                    return response()->json([
                        'status' => false,
                        'error' => 'This Setting Already Exsists!',
                    ], 401);
                }
            }

            $data = [
                'department_id' => !empty($request->department_id) ? $request->department_id : null,
                'designation_id' => !empty($request->designation_id) ? $request->designation_id : null,
                'employee_id' => !empty($request->employee_id) ? $request->employee_id : null,
                'check_in' => $request->check_in,
                'check_out' => $request->check_out,
            ];

            $setting = AttendanceSetting::create($data);

            return response()->json([
                'status' => true,
                'message' => 'Created Setting!',
                'setting' => $setting,
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
        $setting = AttendanceSetting::where('id', $id)->first();
        if ($setting) {
            return response()->json([
                'status' => true,
                'setting' => new AttendanceSettingResource($setting),
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'error' => '404 Settings not found!',
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
        $setting = AttendanceSetting::where('id', $id)->first();
        if ($setting) {
            try {
                //code...
                $validateHoliday = Validator::make(
                    $request->all(),
                    [
                        'check_in' => 'required|date_format:H:i',
                        'check_out' => 'required|date_format:H:i',
                    ]
                );

                if ($validateHoliday->fails()) {
                    return response()->json([
                        'status' => false,
                        'message' => 'validation error',
                        'errors' => $validateHoliday->errors()
                    ], 401);
                }

                $data = [
                    'check_in' => $request->check_in,
                    'check_out' => $request->check_out,
                ];

                $setting->update($data);

                return response()->json([
                    'status' => true,
                    'message' => 'Created Updated!',
                    'setting' => $setting,
                ], 200);
            } catch (\Throwable $th) {
                return response()->json([
                    'status' => false,
                    'message' => $th->getMessage()
                ], 500);
            }
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
        $setting = AttendanceSetting::where('id', $id)->first();
        if ($setting) {
            $setting->delete();
            return response()->json([
                'status' => true,
                'message' => 'Settings Deleted!',
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'error' => '404 Settings not found!',
            ], 404);
        }
    }
}
