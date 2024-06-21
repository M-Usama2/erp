import React, { Component } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from '../components/Employee';
import DepartmentDashboard from '../components/Department';
import UserDashboard from '../components/User';
import RoleDasboard from '../components/Roles';
import TemplateDashboard from '../components/EmailTemplate';
import AssetDashboard from '../components/Asset';
import HolidayDashboard from '../components/Holiday';
import LeaveDashboard from '../components/Leave';
import AttendanceDashboard from '../components/Attendance';
import ViewAttendance from '../components/AttendanceView';
import AttendanceSettingDashboard from '../components/AttendanceSetting';
import PayHeadDashboard from '../components/PayHead';
import Payrolls from '../components/payroll'
import Login from '../components/Login/login';
import { connect } from 'react-redux';
import axios from 'axios';
import { setCurrentUserData, setCurrentUser, setCurrentRoles, setCurrentPermissions } from '../redux/user/user.action';
import Template from '../components/template/Template';
import Cart from '../components/Chart/Chart';
import EmployeeInterview from '../components/EmployeeInterview';
import Expense_Type from '../components/Expense_Type';
import NotFound from '../components/NotFound';
import Expenses from '../components/Expenses';
import ProductCategory from '../components/ProductCategory';
import Products from '../components/Products';
import Hotel from '../components/Hotel';
import LeaveQuest from '../components/LeaveRequest';
import Announcement from '../components/Announcement';
import Ticket from '../components/Ticket';
import Team from '../components/Team';
import Customer from '../components/Customer';

class Urls extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        const token = this.props.token;
        // const setCurrentUserData = this.props.setCurrentUserData;
        const self = this;
        if (token) {
            axios.get('/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(async function (res) {
                console.log(res.data)
                if (await res.data) {
                    self.props.setCurrentUserData(await res.data);
                    self.props.setCurrentRoles(await res.data.roles);
                    self.props.setCurrentPermissions(await res.data.permissions);
                }
            }).catch(async function (error) {
                return error;
            })
        };
    }

    signout = async () => {
        await this.props.setCurrentRoles(null);
        await this.props.setCurrentPermissions(null);
        await this.props.setCurrentUserData(null);
        await this.props.setCurrentUser(null);
    }

    checkPermission = (name) =>
    this.props.role?.includes("super-admin") || this.props.permission?.includes(name);

    render() {



        return (
            <Routes>
                {/* Users */}
                <Route exact path="/users" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'users'} body={this.checkPermission("view user") ? <UserDashboard />: <NotFound />} signout={this.signout} />)} />
                <Route exact path="/users/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'users'} body={this.checkPermission("add user") ?<UserDashboard isAdding /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/users/:usernameParm" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'users'} body={ this.checkPermission("edit user") ?  <UserDashboard isEditing /> : <NotFound/> } signout={this.signout} />)} />

                {/* Roles */}
                <Route exact path="/roles" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'roles'} body={ this.checkPermission("view roles") ?  <RoleDasboard /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/roles/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'roles'} body={ this.checkPermission("add roles") ?  <RoleDasboard isAdding /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/roles/:role" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'roles'} body={ this.checkPermission("edit roles") ?  <RoleDasboard isEditing /> : <NotFound/> } signout={this.signout} />)} />

                {/* Employee */}
                <Route exact path="/employees" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'employee'} body={ this.checkPermission("view employees") ?  <Dashboard /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/employees/:page" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'employee'} body={ this.checkPermission("view employees") ?  <Dashboard /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/employees/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'employee'} body={this.checkPermission("add employees") ? (<Dashboard isAdding={true} />) : <NotFound />} signout={this.signout} />)} />
                <Route exact path="/employees/update/:id" Component={() => !this.props.token ?
                    (<Navigate to={'/login'} />) : (  <Template module={'employee'} body={this.checkPermission("edit employees") ? <Dashboard isEditing={true} /> : <NotFound />} signout={this.signout} />)} />
                {/* Department */}
                <Route exact path="/departments" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'department'} body={ this.checkPermission("view department") ?  <DepartmentDashboard /> : <NotFound/>} signout={this.signout} />)} />
                <Route exact path="/departments/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'department'} body={ this.checkPermission("add department") ?  <DepartmentDashboard isAdding={true} /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/departments/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'department'} body={ this.checkPermission("edit department") ?  <DepartmentDashboard isEditing={true} /> : <NotFound/> } signout={this.signout} />)} />
                {/* Email Templates */}
                <Route exact path="/templates" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'view email-template'} body={ this.checkPermission("add user") ?  <TemplateDashboard /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/templates/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'add email-template'} body={ this.checkPermission("add user") ?  <TemplateDashboard isAdding={true} /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/templates/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'edit email-template'} body={ this.checkPermission("add user") ?  <TemplateDashboard isEditing={true} /> : <NotFound/> } signout={this.signout} />)} />

                {/* Assets */}
                <Route exact path="/assets" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'assets'} body={ this.checkPermission("view assets") ?  <AssetDashboard /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/assets/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'assets'} body={ this.checkPermission("add assets") ?  <AssetDashboard isAdding /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/assets/:id`" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'assets'} body={ this.checkPermission("edit assets") ?  <AssetDashboard isEditing /> : <NotFound/> } signout={this.signout} />)} />

                {/* Holiday */}
                <Route exact path="/holidays" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'holidays'} body={ this.checkPermission("view holiday") ?  <HolidayDashboard /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/holidays/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'holidays'} body={ this.checkPermission("add holiday") ?  <HolidayDashboard isAdding={true} /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/holidays/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'holidays'} body={ this.checkPermission("edit holiday") ?  <HolidayDashboard isEditing={true} /> : <NotFound/> } signout={this.signout} />)} />

                {/* Leave */}
                <Route exact path="/leaves" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'leaves'} body={ this.checkPermission("view leave") ?  <LeaveDashboard /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/leaves/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'leaves'} body={ this.checkPermission("add leave") ?  <LeaveDashboard isAdding={true} /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/leaves/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'leaves'} body={ this.checkPermission("edit leave") ?  <LeaveDashboard isEditing={true} /> : <NotFound/> } signout={this.signout} />)} />

                {/* Attendance */}
                <Route exact path="/attendance" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'attendance'} body={ this.checkPermission("add attendance") ?  <AttendanceDashboard /> : <NotFound/> } signout={this.signout} />)} />

                <Route exact path="/viewattendance" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'view_attendance'} body={ this.checkPermission("view attendance") ?  <ViewAttendance /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/viewattendance/show/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'view_attendance'} body={ this.checkPermission("edit attendance") ?  <ViewAttendance isView={true} />: <NotFound/> } signout={this.signout} />)} />
                {/* Attendance Settings */}
                <Route exact path="/attendance/settings" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'attendance_settings'} body={ this.checkPermission("view settings") ?  <AttendanceSettingDashboard /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/attendance/settings/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'attendance_settings'} body={ this.checkPermission("add settings") ?  <AttendanceSettingDashboard isAdding={true} /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/attendance/settings/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'attendance_settings'} body={ this.checkPermission("edit settings") ?  <AttendanceSettingDashboard isEditing={true} /> : <NotFound/> } signout={this.signout} />)} />

                {/* PayHeads */}
                <Route exact path="/payheads" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'payheads'} body={ this.checkPermission("view payhead") ?  <PayHeadDashboard /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/payheads/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'payheads'} body={ this.checkPermission("add payhead") ?  <PayHeadDashboard isAdding /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/payheads/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'payheads'} body={ this.checkPermission("edit payhead") ?  <PayHeadDashboard isEditing /> : <NotFound/> } signout={this.signout} />)} />

                {/* Payrolls */}
                <Route exact path="/payrolls" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'payrolls'} body={ this.checkPermission("view payroll") ?  <Payrolls /> : <NotFound/> } signout={this.signout} />)} />
                {/* <Route exact path="/payrolls/view" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'payrolls'} body={<Payrolls isView />} signout={this.signout} />)} /> */}
                <Route exact path="/payrolls/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'payrolls'} body={ this.checkPermission("add payroll") ?  <Payrolls isAdding /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/payrolls/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'payrolls'} body={ this.checkPermission("edit payroll") ?  <Payrolls isView /> : <NotFound/> } signout={this.signout} />)} />

                {/* Employee */}
                <Route exact path="/interview" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'interview'} body={ this.checkPermission("view interview") ?  <EmployeeInterview /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/interview/:page" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'interview'} body={ this.checkPermission("view interview") ?  <EmployeeInterview /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/interview/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'interview'} body={ this.checkPermission("add interview") ?  <EmployeeInterview isAdding={true} /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/interview/update/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'interview'} body={ this.checkPermission("edit interview") ?  <EmployeeInterview isEditing={true} /> : <NotFound/> } signout={this.signout} />)} />

                <Route exact path="/expense_type" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'expense_type'} body={ this.checkPermission("view expense_type") ?  <Expense_Type /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/expense_type/:page" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'expense_type'} body={ this.checkPermission("view expense_type") ?  <Expense_Type /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/expense_type/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'expense_type'} body={ this.checkPermission("add expense_type") ?  <Expense_Type isAdding={true} /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/expense_type/update/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'expense_type'} body={ this.checkPermission("edit expense_type") ?  <Expense_Type isEditing={true} /> : <NotFound/> } signout={this.signout} />)} />

                <Route exact path="/expense" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'expense'} body={ this.checkPermission("view expense") ?  <Expenses /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/expense/:page" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'expense'} body={ this.checkPermission("view expense") ?  <Expenses /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/expense/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'expense'} body={ this.checkPermission("add expense") ?  <Expenses isAdding={true} /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/expense/update/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'expense'} body={ this.checkPermission("edit expense") ?  <Expenses isEditing={true} /> : <NotFound/> } signout={this.signout} />)} />

                <Route exact path="/productCategories" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'product_category'} body={ this.checkPermission("view product-category") ?  <ProductCategory /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/productCategories/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'product_category'} body={ this.checkPermission("add product-category") ?  <ProductCategory isAdding={true} /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/productCategories/edit/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'product_category'} body={ this.checkPermission("edit product-category") ?  <ProductCategory isEditing={true} /> : <NotFound/> } signout={this.signout} />)} />

                <Route exact path="/products" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'product'} body={ this.checkPermission("view product") ?  <Products /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/products/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'product'} body={ this.checkPermission("add product") ?  <Products isAdding /> : <NotFound/> } signout={this.signout} />)} />
                <Route exact path="/products/edit/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'product'} body={ this.checkPermission("edit product") ?  <Products isEditing /> : <NotFound/> } signout={this.signout} />)} />

                {/* Hotels */}
                <Route exact path="/hotels" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'hotels'} body={<Hotel />} signout={this.signout} />)} />
                <Route exact path="/hotels/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'hotels'} body={<Hotel isAdding />} signout={this.signout} />)} />
                <Route exact path="/hotels/update/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'hotels'} body={<Hotel isEditing />} signout={this.signout} />)} />

                {/* Leave Request */}
                <Route exact path="/leaveRequests" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'leaveRequests'} body={<LeaveQuest />} signout={this.signout} />)} />
                <Route exact path="/leaveRequests/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'leaveRequests'} body={<LeaveQuest isAdding />} signout={this.signout} />)} />
                <Route exact path="/leaveRequests/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'leaveRequests'} body={<LeaveQuest isEditing />} signout={this.signout} />)} />

                {/* Announcement */}
                <Route exact path="/announcements" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'announcements'} body={<Announcement />} signout={this.signout} />)} />
                <Route exact path="/announcements/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'announcements'} body={<Announcement isAdding />} signout={this.signout} />)} />
                <Route exact path="/announcements/update/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'announcements'} body={<Announcement isEditing />} signout={this.signout} />)} />

                {/* Ticket */}
                <Route exact path="/tickets" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'tickets'} body={<Ticket />} signout={this.signout} />)} />
                <Route exact path="/tickets/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'tickets'} body={<Ticket isAdding />} signout={this.signout} />)} />
                <Route exact path="/tickets/update/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'tickets'} body={<Ticket isEditing />} signout={this.signout} />)} />

                {/* Team */}
                <Route exact path="/teams" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'teams'} body={<Team />} signout={this.signout} />)} />
                <Route exact path="/teams/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'teams'} body={<Team isAdding />} signout={this.signout} />)} />
                <Route exact path="/teams/update/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'teams'} body={<Team isEditing />} signout={this.signout} />)} />
                
                {/* Customer */}
                <Route exact path="/customers" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'customers'} body={<Customer />} signout={this.signout} />)} />
                <Route exact path="/customers/add" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'customers'} body={<Customer isAdding />} signout={this.signout} />)} />
                <Route exact path="/customers/update/:id" Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'customers'} body={<Customer isEditing />} signout={this.signout} />)} />

                <Route path="/login" Component={() => this.props.token ? (<Navigate to={'/'} />) : (<Login />)} />
                <Route path='*' exact Component={() => !this.props.token ? (<Navigate to={'/login'} />) : (<Template module={'dashboard'} body={<Cart />} signout={this.signout} />)} />
                {/* <Route path='*' exact Component={() => <Template body={<Cart />} signout={this.signout} />} /> */}
            
            </Routes>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    user: state.user.userData,
    role: state.role.currentRole,
    permission: state.permission.currentPermission,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUserData: (user) => dispatch(setCurrentUserData(user)),
    setCurrentUser: (token) => dispatch(setCurrentUser(token)),
    setCurrentRoles: (role) => dispatch(setCurrentRoles(role)),
    setCurrentPermissions: (permission) => dispatch(setCurrentPermissions(permission))
});

export default connect(mapStateToProps, mapDispatchToProps)(Urls);
