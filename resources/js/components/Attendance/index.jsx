import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Header from './Header'
import List from './List'
import Loader1 from '../template/loaders/Loader1';

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment/moment';

const AttendanceDashboard = ({ isAdding = false, isEditing = false, token }) => {
    const [attendanceDate, setAttendanceDate] = useState(moment().format('YYYY-MM-DD'));
    const [listLoading, setListLoading] = useState(false);
    // Get Data
    const fetchAttendance = () => {
        const setDated = attendanceDate ? `?dated=${attendanceDate}` : '';
        axios({
            method: 'get',
            url: `/api/attendance${setDated}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async function (response) {
                if (await response.data.attendance) {
                    setAttendance(response.data.attendance);
                    setListLoading(false)
                }
            });
    }

    // Get Data
    const fecthData = () => {
        axios({
            method: 'get',
            url: `/api/employees?all=1`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async function (response) {
                if (await response.data.data) {
                    const data = response.data.data;
                    setEmployees(data)
                    fecthLeaves();
                }
            });
    }

    // Get Departments
    const fecthLeaves = () => {
        axios({
            method: 'get',
            url: `/api/leaves`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async function (response) {
                if (await response.data.leaves) {
                    setLeaves(response.data.leaves);
                    setLoading(false)
                }
            });
    }

    const dateChange = (e) => {
        setListLoading(true);
        setAttendanceDate(e.target.value);

    }

    useEffect(() => {
        fetchAttendance()
        return () => {
            fecthData();
        }
    }, [attendanceDate])

    const [employees, setEmployees] = useState(fecthData);
    const [leaves, setLeaves] = useState(null);
    const [attendance, setAttendance] = useState([]);

    const [loading, setLoading] = useState(true);

    return (
        loading ? <Loader1 /> :
            <div className='container'>
                {/* List */}
                {!isAdding && !isEditing && (
                    <>
                        <Header dateChange={dateChange} currentDate={attendanceDate} />
                        <List
                            employees={employees}
                            leaves={leaves}
                            attendance={attendance}
                            token={token}
                            fetchAttendance={fetchAttendance}
                            attendanceDate={attendanceDate}
                            loading={listLoading}
                            setLoading={setListLoading}

                        />
                    </>
                )}
            </div>
    )
}
const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    user: state.user.userData
});
export default connect(mapStateToProps)(AttendanceDashboard)
