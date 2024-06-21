<?php

use App\Http\Controllers\Attendance\AttendanceController;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/test', function () {
    $zk = new ZKLibrary(env('ATTENDANCE_MACHINE_HOST'), env('ATTENDANCE_MACHINE_PORT'));
    $zk->connect();
    // $zk->disableDevice();
    $zk->testVoice();
    // $zk->enableDevice();
    $zk->disconnect();
});
Route::get('/attendance-report/{employee_id}', [AttendanceController::class, 'getAttendanceReport']);
// Route::view('/{path?}', 'welcome');
Route::get('{all}', function () {
    return view('welcome');
})->where('all', '^((?!api).)*')->name('index');