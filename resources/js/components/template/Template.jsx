import React, { useState } from 'react'
import './template.css';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EmailIcon from '@mui/icons-material/Email';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import SettingIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BadgeIcon from '@mui/icons-material/Badge';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HotelIcon from '@mui/icons-material/Hotel';
import PaymentsIcon from '@mui/icons-material/Payments';
import PeopleIcon from '@mui/icons-material/PeopleAlt';
import { Person2, Style } from '@mui/icons-material';
import { Announcement as AnnouncementIcon } from '@mui/icons-material';
import { connect } from "react-redux";

function Template({ body, signout, module, role, permission }) {

    const [openCollapse, setOpenCollapse] = React.useState(false);

    function handleOpenSettings() {
        setOpenCollapse(!openCollapse);
    }

    function DropdownMenu(props) {
        return (
            <li className="nav-item">
                <Link className={`nav-link text-white   ${module == 'dashboard' ? 'active ' : 'h'}`} aria-current="page" to="/" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }} >
                    <span data-feather="home">
                    </span>
                    <HomeIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Dashboard
                    {/* <span className={`${module == 'dashboard' ? 'selected dash-sidebar' : ''}`}>
                    </span> */}
                </Link>
            </li>
        )
    }

    const checkPermission = (name) =>
        role?.includes("super-admin") || permission?.includes(name);

    return (
        <>
            <header className="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow" style={{ background: '#2b3643' }}>
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fw-bold text-white " style={{ fontSize: '15px', color: '#ffc200', width: '', textDecoration: 'none' }} href="#"> <span style={{ backgroundColor: 'white', padding: '8px 0 8px 0px ', borderRadius: '2px', marginRight: '10px' }}><img height="35px" src="./jarvis/Jarvis.png" /> </span>JARVIS TECH</a>
                {/* <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="navbar-nav" style={{ background: '#2b3643' }}>
                    <div className="nav-item text-nowrap">
                        <a className="nav-link px-3" href="#"
                            onClick={
                                signout
                            }
                        >Sign out</a>
                    </div>
                </div>
            </header>
            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block sidebar collapse" style={{ background: '#364150', overflowY: 'scroll' }}>
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column ">
                                <DropdownMenu />

                                {checkPermission("view employees") ? (


                                    <li className="nav-item">
                                        <hr />
                                        <Link className={`nav-link text-white ${module == 'employee' ? 'active ' : 'h'}`} aria-current="page" to="/employees" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                            <span data-feather="home"></span>
                                            <PeopleAltIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Employees Info
                                            {/* <span className={`${module == 'employee' ? 'selected employee-sidebar' : ''}`}>
                                        </span> */}
                                        </Link>

                                    </li>
                                ) : null}

                                {checkPermission("view interview") ? (


                                    <li className="nav-item">
                                        <Link className={`nav-link text-white ${module == 'interview' ? 'active ' : 'h'} `} aria-current="page" to="/interview" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                            <span data-feather="home"></span>
                                            <EmailIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Interview
                                            {/* <span className={`${module == 'interview' ? 'selected template-sidebar' : ''}`}>
                                        </span> */}
                                        </Link>
                                    </li>
                                ) : null}

                                {checkPermission("view department") ? (


                                    <li className="nav-item">
                                        <Link className={`nav-link text-white ${module == 'department' ? 'active ' : 'h'} `} aria-current="page" to="/departments" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                            <span data-feather="home"></span>
                                            <BusinessCenterIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Departments
                                            {/* <span className={`${module == 'department' ? 'selected depart-sidebar' : ''}`}>
                                        </span> */}

                                        </Link>
                                    </li>

                                ) : null}

                                <li className="nav-item">
                                    <Link className={`nav-link text-white ${module == 'teams' ? 'active ' : 'h'} `} aria-current="page" to="/teams" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                        <span data-feather="home"></span>
                                        <PeopleIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Teams
                                        {/* <span className={`${module == 'department' ? 'selected depart-sidebar' : ''}`}>
                                        </span> */}

                                    </Link>
                                </li>

                                {checkPermission("view attendance") ? (


                                    <li className="nav-item">
                                        <hr />
                                        <Link className={`nav-link text-white ${module == 'attendance' ? 'active ' : 'h'} `} aria-current="page" to="/attendance" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                            <span data-feather="home"></span>
                                            <BadgeIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Attendance
                                            {/* <span className={`${module == 'attendance' ? 'selected attendanc-sidebar' : ''}`}>
                                        </span> */}
                                        </Link>
                                    </li>
                                ) : null}


                                {checkPermission("view attendance") ? (

                                    <li className="nav-item">
                                        <Link className={`nav-link text-white ${module == 'view_attendance' ? 'active ' : 'h'} `} aria-current="page" to="/viewattendance" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                            <span data-feather="home"></span>
                                            <VisibilityIcon style={{ fontSize: '20px', marginRight: '10px' }} /> View Attendance
                                            {/* <span className={`${module == 'view_attendance' ? 'selected view-attendanc-sidebar' : ''}`}>
                                        </span> */}
                                        </Link>
                                    </li>
                                ) : null}

                                {checkPermission("view leave") ? (

                                    <li className="nav-item">
                                        <Link className={`nav-link text-white ${module == 'leaves' ? 'active ' : 'h'} `} aria-current="page" to="/leaves" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                            <span data-feather="home"></span>
                                            <CalendarMonthIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Leave Type
                                            {/* <span className={`${module == 'leaves' ? 'selected leave-sidebar' : ''}`}>
                                        </span> */}
                                        </Link>
                                    </li>
                                ) : null}

                                <li className="nav-item">
                                    <Link className={`nav-link text-white ${module == 'leaveRequests' ? 'active ' : 'h'} `} aria-current="page" to="/leaveRequests" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                        <span data-feather="home"></span>
                                        <CalendarMonthIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Leave Request
                                        {/* <span className={`${module == 'leaves' ? 'selected leave-sidebar' : ''}`}>
                                        </span> */}
                                    </Link>
                                </li>

                                {checkPermission("view holiday") ? (

                                    <li className="nav-item">
                                        <Link className={`nav-link text-white ${module == 'holidays' ? 'active ' : 'h'} `} aria-current="page" to="/holidays" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                            <span data-feather="home"></span>
                                            <ScheduleIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Holidays
                                            {/* <span className={`${module == 'holidays' ? 'selected holiday-sidebar' : ''}`}>
                                        </span> */}
                                        </Link>
                                    </li>
                                ) : null}

                                {checkPermission("view settings") ? (

                                    <li className="nav-item">
                                        <Link className={`nav-link text-white ${module == 'attendance_settings' ? 'active ' : 'h'} `} aria-current="page" to="/attendance/settings" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                            <span data-feather="home"></span>
                                            <SettingIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Attendance Settings
                                            {/* <span className={`${module == 'attendance_settings' ? 'selected attendance-settings-sidebar' : ''}`}>
                                        </span> */}
                                        </Link>
                                    </li>

                                ) : null}

                                {checkPermission("view payhead") ? (


                                    <li className="nav-item">
                                        <hr />
                                        <Link className={`nav-link text-white ${module == 'payheads' ? 'active ' : 'h'} `} aria-current="page" to="/payheads" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                            <span data-feather="home"></span>
                                            <CurrencyExchangeIcon style={{ fontSize: '20px', marginRight: '10px' }} /> PayHeads
                                            {/* <span className={`${module == 'payheads' ? 'selected attendanc-sidebar' : ''}`}>
                                        </span> */}
                                        </Link>
                                    </li>

                                ) : null}

                                {checkPermission("view payroll") ? (

                                    <li className="nav-item">
                                        <Link className={`nav-link text-white ${module == 'payrolls' ? 'active ' : 'h'} `} aria-current="page" to="/payrolls" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                            <span data-feather="home"></span>
                                            <PaymentsIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Payrolls
                                            {/* <span className={`${module == 'payrolls' ? 'selected attendanc-sidebar' : ''}`}>
                                        </span> */}
                                        </Link>
                                    </li>
                                ) : null}

                                <li className="nav-item d-none">
                                    <hr />
                                    <Link className={`nav-link text-white ${module == 'hotels' ? 'active ' : 'h'} `} aria-current="page" to="/hotels" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                        <span data-feather="home"></span>
                                        <HotelIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Hotels
                                        {/* <span className={`${module == 'payheads' ? 'selected attendanc-sidebar' : ''}`}>
                                        </span> */}
                                    </Link>
                                </li>

                                {checkPermission("view product-category") ? (

                                    <li className="nav-item">
                                        <hr />
                                        <Link className={`nav-link text-white ${module == 'product_category' ? 'active ' : 'h'} `} aria-current="page" to="/productCategories" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                            <span data-feather="home"></span>
                                            <CurrencyExchangeIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Categories
                                            {/* <span className={`${module == 'payheads' ? 'selected attendanc-sidebar' : ''}`}>
                                        </span> */}
                                        </Link>
                                    </li>

                                ) : null}


                                {checkPermission("view product") ? (

                                    <li className="nav-item">
                                        <Link className={`nav-link text-white ${module == 'product' ? 'active ' : 'h'} `} aria-current="page" to="/products" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                            <span data-feather="home"></span>
                                            <CurrencyExchangeIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Products/Services
                                        </Link>
                                    </li>

                                ) : null}


                                <li className="nav-item">
                                    <hr />
                                    <Link className={`nav-link text-white ${module == 'tickets' ? 'active ' : 'h'} `} aria-current="page" to="/tickets" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                        <span data-feather="home"></span>
                                        <Style style={{ fontSize: '20px', marginRight: '10px' }} /> Tickets
                                        {/* <span className={`${module == 'users' ? 'selected user-sidebar' : ''}`}>
                                        </span> */}
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className={`nav-link text-white ${module == 'customers' ? 'active ' : 'h'} `} aria-current="page" to="/Customers" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                        <span data-feather="home"></span>
                                        <Person2 style={{ fontSize: '20px', marginRight: '10px' }} /> Customers
                                        {/* <span className={`${module == 'users' ? 'selected user-sidebar' : ''}`}>
                                        </span> */}
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <hr />
                                    <Link className={`nav-link text-white ${module == 'expense_type' ? 'active ' : 'h'} `} aria-current="page" to="/expense_type" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                        <span data-feather="home"></span>
                                        <AttachMoneyIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Expense Type
                                        {/* <span className={`${module == 'users' ? 'selected user-sidebar' : ''}`}>
                                        </span> */}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link text-white ${module == 'expense' ? 'active ' : 'h'} `} aria-current="page" to="/expense" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                        <span data-feather="home"></span>
                                        <AttachMoneyIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Expenses
                                        {/* <span className={`${module == 'users' ? 'selected user-sidebar' : ''}`}>
                                        </span> */}
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className={`nav-link text-white ${module == 'announcements' ? 'active ' : 'h'} `} aria-current="page" to="/announcements" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                        <span data-feather="home"></span>
                                        <AnnouncementIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Announcement
                                        {/* <span className={`${module == 'users' ? 'selected user-sidebar' : ''}`}>
                                        </span> */}
                                    </Link>
                                </li>


                                {checkPermission("view email-template") && 1 == 0 ? (

                                    <li className="nav-item">
                                        <hr />
                                        <Link className={`nav-link text-white ${module == 'templates' ? 'active ' : 'h'} `} aria-current="page" to="/templates" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                            <span data-feather="home"></span>
                                            <EmailIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Email Templates
                                            {/* <span className={`${module == 'templates' ? 'selected template-sidebar' : ''}`}>
                                        </span> */}
                                        </Link>
                                    </li>
                                ) : null}

                                {checkPermission("view user") ? (


                                    <li className="nav-item">
                                        <Link className={`nav-link text-white ${module == 'users' ? 'active ' : 'h'} `} aria-current="page" to="/users" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                            <span data-feather="home"></span>
                                            <GroupIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Users
                                            {/* <span className={`${module == 'users' ? 'selected user-sidebar' : ''}`}>
                                        </span> */}
                                        </Link>
                                    </li>

                                ) : null}

                                {checkPermission("view roles") ? (

                                    <li className="nav-item">
                                        <Link className={`nav-link text-white ${module == 'roles' ? 'active ' : 'h'} `} aria-current="page" to="/roles" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', }}>
                                            <span data-feather="home"></span>
                                            <EditCalendarIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Roles
                                            {/* <span className={`${module == 'users' ? 'selected user-sidebar' : ''}`}>
                                        </span> */}
                                        </Link>
                                    </li>
                                ) : null}


                            </ul>
                        </div>
                    </nav>
                </div>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                    {body}
                </main>
            </div>
        </>
    )
}


const mapStateToProps = (state) => ({
    role: state.role.currentRole,
    permission: state.permission.currentPermission,
});

export default connect(mapStateToProps)(Template);
