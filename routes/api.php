<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\Attendance\AttendanceController;
use App\Http\Controllers\Attendance\AttendanceSettingController;
use App\Http\Controllers\Attendance\HolidayController;
use App\Http\Controllers\Attendance\LeaveController;
use App\Http\Controllers\Attendance\LeaveRequestController;
use App\Http\Controllers\EmailTemplateController;
use App\Http\Controllers\Employee\AssetController;
use App\Http\Controllers\Employee\DepartmentController;
use App\Http\Controllers\Employee\DesignationController;
use App\Http\Controllers\Employee\EmployeeController;
use App\Http\Controllers\Employee\EmployeeDocumentController;
use App\Http\Controllers\Employee\EmployeeEducationController;
use App\Http\Controllers\Employee\EmployeeExperienceController;
use App\Http\Controllers\Employee\EmployeeInterviewController;
use App\Http\Controllers\Employee\SalaryController;
use App\Http\Controllers\Employee\TeamController;
use App\Http\Controllers\Expense\ExpenseTypeController;
use App\Http\Controllers\Expense\ExpenseController;
use App\Http\Controllers\FilterComponent;
use App\Http\Controllers\HelpDesk\CustomerController;
use App\Http\Controllers\HelpDesk\ProjectController;
use App\Http\Controllers\HelpDesk\TicketController;
use App\Http\Controllers\Hotel\HotelController;
use App\Http\Controllers\Notification\AnnouncementController;
use App\Http\Controllers\Payroll\PayHeadController;
use App\Http\Controllers\Payroll\PayrollController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\Sales\CategoryController;
use App\Http\Controllers\Sales\ProductController;
use App\Http\Controllers\Sales\SaleController;
use App\Http\Controllers\Settings\RoleController;
use App\Http\Resources\UserResource;
use App\Models\Employee\Salary;
use App\Models\Expense\Expense;
use App\Models\Payroll\Payroll;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $routes = collect(Route::getRoutes())->map(function ($route) {
        return $route->uri;
    });

    return response()->json(['message' => 'Welcome to HRM API', 'routes' => $routes]);
});

Route::middleware('auth:sanctum')->get('/profile', function (Request $request) {
    return response()->json(new UserResource($request->user()));
});

Route::middleware('auth:sanctum')->get('/logout', [AuthController::class, 'logout']);

//Auth
Route::post('/register', [AuthController::class, 'createUser']);
Route::post('/login', [AuthController::class, 'loginUser']);

//Usful routes
Route::middleware('auth:sanctum')->get('/count', [AppController::class, 'show']);
//User
Route::middleware('auth:sanctum')->get('/users', [UserController::class, 'show']);
Route::middleware('auth:sanctum')->get('/user/{username}', [UserController::class, 'show']);
Route::middleware('auth:sanctum')->post('/user', [UserController::class, 'store']);
Route::middleware('auth:sanctum')->put('/user/{username}', [UserController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/user', [UserController::class, 'delete']);
Route::middleware('auth:sanctum')->delete('/user/{id}', [UserController::class, 'delete']);

// Employees id=Employee_id
Route::middleware('auth:sanctum')->get('/employees', [EmployeeController::class, 'show']);
Route::middleware('auth:sanctum')->get('/employee/{id}', [EmployeeController::class, 'show']);
Route::middleware('auth:sanctum')->post('/employee', [EmployeeController::class, 'store']);
Route::middleware('auth:sanctum')->put('/employee/{id}', [EmployeeController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/employee', [EmployeeController::class, 'delete']);
Route::middleware('auth:sanctum')->delete('/employee/{id}', [EmployeeController::class, 'delete']);

Route::middleware('auth:sanctum')->post('/employee/{id}/bank', [EmployeeController::class, 'bank']);
Route::middleware('auth:sanctum')->resource('/employee/{employee_id}/salary', SalaryController::class);
Route::middleware('auth:sanctum')->post('/employee/{employee_id}/salary/status/{id}', [SalaryController::class, 'status']);

// Employee Education id=Employee_id
Route::middleware('auth:sanctum')->get('/employee/education/{id}', [EmployeeEducationController::class, 'show']);
Route::middleware('auth:sanctum')->post('/employee/education/add/{id}', [EmployeeEducationController::class, 'store']);
Route::middleware('auth:sanctum')->put('/employee/education/update/{education_id}', [EmployeeEducationController::class, 'update']);
// id=emp_education_id
Route::middleware('auth:sanctum')->delete('/employee/education', [EmployeeEducationController::class, 'delete']);
Route::middleware('auth:sanctum')->delete('/employee/education/{id}', [EmployeeEducationController::class, 'delete']);

// SEARCH API
Route::get('search/{name}', [FilterComponent::class, 'search']);
Route::get('depart/{title}', [FilterComponent::class, 'DepartmentSearch']);

// Employee Experience id=Employee_id
Route::middleware('auth:sanctum')->get('/employee/exp/{id}', [EmployeeExperienceController::class, 'show']);
Route::middleware('auth:sanctum')->post('/employee/exp/add/{id}', [EmployeeExperienceController::class, 'store']);
Route::middleware('auth:sanctum')->put('/employee/exp/update/{exp_id}', [EmployeeExperienceController::class, 'update']);
// id=emp_exp_id
Route::middleware('auth:sanctum')->delete('/employee/exp', [EmployeeExperienceController::class, 'delete']);
Route::middleware('auth:sanctum')->delete('/employee/exp/{id}', [EmployeeExperienceController::class, 'delete']);

// Employee Document
Route::middleware('auth:sanctum')->get('/employee/document/{id}', [EmployeeDocumentController::class, 'show']);
Route::middleware('auth:sanctum')->post('/employee/document/add/{id}', [EmployeeDocumentController::class, 'store']);
Route::middleware('auth:sanctum')->delete('/employee/document/{id}', [EmployeeDocumentController::class, 'delete']);

// Employee Interview
Route::middleware('auth:sanctum')->get('/interview', [EmployeeInterviewController::class, 'show']);
Route::middleware('auth:sanctum')->get('/interview/{id}', [EmployeeInterviewController::class, 'show']);
Route::middleware('auth:sanctum')->post('/interview/{id}', [EmployeeInterviewController::class, 'store']);
Route::middleware('auth:sanctum')->put('/interview/{id}/hired', [EmployeeInterviewController::class, 'setStatus']);
Route::middleware('auth:sanctum')->delete('/interview/{id}', [EmployeeInterviewController::class, 'delete']);
Route::middleware('auth:sanctum')->post('/interview_notes/{interview_id}', [EmployeeInterviewController::class, 'store_notes']);

// EMployee hired = 1 or 0 status api
Route::middleware('auth:sanctum')->put('/employee/employee_status/{id}', [EmployeeInterviewController::class, 'setStatus']);



// Department
Route::middleware('auth:sanctum')->get('/departments', [DepartmentController::class, 'show']);
Route::middleware('auth:sanctum')->get('/department/{id}', [DepartmentController::class, 'show']);

Route::middleware('auth:sanctum')->post('/department', [DepartmentController::class, 'store']);
Route::middleware('auth:sanctum')->put('/department/{id}', [DepartmentController::class, 'update']);

Route::middleware('auth:sanctum')->delete('/department', [DepartmentController::class, 'delete']);
Route::middleware('auth:sanctum')->delete('/department/{id}', [DepartmentController::class, 'delete']);

// Designaton
Route::middleware('auth:sanctum')->get('/designations', [DesignationController::class, 'show']);
Route::middleware('auth:sanctum')->get('/designation/{id}', [DesignationController::class, 'show']);

Route::middleware('auth:sanctum')->post('/designation/{id}', [DesignationController::class, 'store']);
Route::middleware('auth:sanctum')->put('/designation/{id}', [DesignationController::class, 'update']);

Route::middleware('auth:sanctum')->delete('/designation', [DesignationController::class, 'delete']);
Route::middleware('auth:sanctum')->delete('/designation/{id}', [DesignationController::class, 'delete']);

// Employee Designation

Route::middleware('auth:sanctum')->post('/employees/setDesignation', [EmployeeController::class, 'setDesignation']);

// AssignedAssert
Route::middleware('auth:sanctum')->get('/assets', [AssetController::class, 'show']);
Route::middleware('auth:sanctum')->get('/assets/{id}', [AssetController::class, 'show']);
Route::middleware('auth:sanctum')->post('/assets', [AssetController::class, 'store']);
Route::middleware('auth:sanctum')->delete('/assets/{id}', [AssetController::class, 'delete']);

// Email Template
Route::middleware('auth:sanctum')->resource('/templates', EmailTemplateController::class);

// Permission and roles
Route::middleware('auth:sanctum')->get('/roles', [PermissionController::class, 'roles']);


// Attendance management
// HOliday
Route::middleware('auth:sanctum')->resource('/holidays', HolidayController::class);
// LEaves
Route::middleware('auth:sanctum')->resource('/leaves', LeaveController::class);
// Settings
Route::middleware('auth:sanctum')->resource('/attendance_settings', AttendanceSettingController::class);
// Attendance
Route::middleware('auth:sanctum')->resource('/attendance', AttendanceController::class);

// Payroll Management
// Attendance
Route::middleware('auth:sanctum')->resource('/payheads', PayHeadController::class);
Route::middleware('auth:sanctum')->resource('/payrolls', PayrollController::class);

// Roles
Route::middleware('auth:sanctum')->resource('/roles', RoleController::class);
Route::middleware('auth:sanctum')->get('/permissions', [RoleController::class, 'permissions']);

Route::middleware('auth:sanctum')->resource('/expense_type', ExpenseTypeController::class);
Route::middleware('auth:sanctum')->resource('/expense', ExpenseController::class);
Route::middleware('auth:sanctum')->put('/expense/setStatus/{id}', [ExpenseController::class, "setStatus"]);


Route::middleware('auth:sanctum')->resource('/sales/categories', CategoryController::class);
Route::middleware('auth:sanctum')->resource('/sales/products', ProductController::class);
Route::middleware('auth:sanctum')->resource('/sales/sales', SaleController::class);

Route::middleware('auth:sanctum')->resource('/hotels', HotelController::class);

// Leave Request
Route::middleware('auth:sanctum')->resource('/leave_requests', LeaveRequestController::class);
Route::middleware('auth:sanctum')->put('/leave_requests/{id}/approve', [LeaveRequestController::class, 'approve']);
Route::middleware('auth:sanctum')->put('/leave_requests/{id}/reject', [LeaveRequestController::class, 'reject']);

// Announcement
Route::middleware('auth:sanctum')->resource('announcements', AnnouncementController::class);
Route::middleware('auth:sanctum')->post('announcements/{announcement_id}/saveAttachment', [AnnouncementController::class, 'saveAttachment']);
Route::middleware('auth:sanctum')->post('announcements/{announcement_id}/removeAttachment', [AnnouncementController::class, 'removeAttachment']);
Route::middleware('auth:sanctum')->post('announcements/{announcement_id}/addEmployee', [AnnouncementController::class, 'addEmployee']);
Route::middleware('auth:sanctum')->post('announcements/{announcement_id}/removeEmployee/{employee_id}', [AnnouncementController::class, 'removeEmployee']);

// Ticket
Route::middleware('auth:sanctum')->resource('tickets', TicketController::class);
Route::middleware('auth:sanctum')->post('tickets/{ticket_id}/comments', [TicketController::class, 'comment']);
// Route::middleware('auth:sanctum')->put('tickets/{ticket_id}/close', [TicketController::class, 'close']);
// Route::middleware('auth:sanctum')->put('tickets/{ticket_id}/open', [TicketController::class, 'open']);

// Team
Route::middleware('auth:sanctum')->resource('teams', TeamController::class);
Route::middleware('auth:sanctum')->post('teams/{team_id}/addMember', [TeamController::class, 'addMember']);
Route::middleware('auth:sanctum')->delete('teams/{team_id}/removeMember/{employee_id}', [TeamController::class, 'removeMember']);

// Customers
Route::middleware('auth:sanctum')->resource('customers', CustomerController::class);

//Project
Route::middleware('auth:sanctum')->resource('projects', ProjectController::class);
Route::middleware('auth:sanctum')->post('projects/{project_id}/addMember', [ProjectController::class, 'addMember']);
Route::middleware('auth:sanctum')->delete('projects/{project_id}/removeMember/{employee_id}', [ProjectController::class, 'removeMember']);
Route::middleware('auth:sanctum')->post('projects/{project_id}/addMilestone', [ProjectController::class, 'addMilestone']);
Route::middleware('auth:sanctum')->delete('projects/{project_id}/removeMilestone/{milestone_id}', [ProjectController::class, 'removeMilestone']);

// THrouggh Machine
Route::middleware('auth:sanctum')->get('/employee-machine', [EmployeeController::class, 'storeMachine']);
Route::get('/attendance-machine', [AttendanceController::class, 'machineStore']);
