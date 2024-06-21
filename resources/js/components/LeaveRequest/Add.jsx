import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const Add = ({ token }) => {
    const [reason, setReason] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [employee_id, setEmployeeId] = useState(null);
    const navigate = useNavigate();

    function employeeList() {
        axios({
            method: 'get',
            url: '/api/employees',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setEmployees(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const [employees, setEmployees] = useState(employeeList);

    function submit(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/api/leave_requests',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: {
                employee_id: employee_id,
                reason: reason,
                start_date: start_date,
                end_date: end_date,
            },
        })
            .then((res) => {
                navigate('/leaveRequests');
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '40px' }}>
            <div style={{ width: '90%', border: '1px solid grey', padding: '20px' }}>
                <Breadcrumbs style={{ background: '#f7f7f7', padding: '7px 10px', marginBottom: '20px' }} aria-label="breadcrumb">
                    <Link style={{ fontSize: '13px', display: 'flex', alignItems: 'center', color: '#9a8888' }} to="/">
                        <HomeIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Dashboard
                    </Link>
                    <Link style={{ fontSize: '13px', color: '#9a8888' }} to="/leaveRequests">
                        Leave Requests
                    </Link>
                </Breadcrumbs>
                <h4>Add Leave Request</h4>
                <form onSubmit={submit}>
                    <div className="row">
                        <div className="col-12">
                            <select required onChange={(e) => setEmployeeId(e.target.value)}>
                                <option value="">Select Employee</option>
                                {employees?.map((employee) => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <input required type="text" placeholder="Reason" value={reason} onChange={(e) => setReason(e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <input type="date" value={start_date} onChange={(e) => setStartDate(e.target.value)} required />
                        </div>
                        <div className="col-6">
                            <input type="date" value={end_date} onChange={(e) => setEndDate(e.target.value)} required />
                        </div>
                    </div>
                    <button type="submit" className="mt-4" style={{ borderRadius: '0', backgroundColor: '#1caf9a', border: 'none', fontWeight: '200' }}>
                        Submit
                    </button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    token: state.user.currentUser,
});

export default connect(mapStateToProps)(Add);
