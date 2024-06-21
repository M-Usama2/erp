import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';
import LoadingButton from '@mui/lab/LoadingButton';
import Loader1 from '../template/loaders/Loader1';
import { connect } from "react-redux";

function List({ employees, leaves, attendance, fecthAttendance, token, attendanceDate, loading, setLoading }) {
    const params = useParams();
    const today = new Date();
    const currentTime = today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();

    const [status, setStatus] = useState([]);
    const [saving, setSaving] = useState(false);

    const setNewData = () => {
        var statusData = [];
        const attendanceData = attendance.length < 1 ? employees : attendance;
        for (let i = 0; i < attendanceData.length; i++) {
            statusData[i] = {
                id: attendanceData[i].id,
                employee_id: attendance.length < 1 ? attendanceData[i].id : attendanceData[i].employee_id,
                name: attendanceData[i].name,
                leave_id: ("leave_id" in attendanceData[i]) ? attendanceData[i].leave_id : null,
                check_in: ("check_in" in attendanceData[i]) ? attendanceData[i].check_in : currentTime,
                check_out: ("check_out" in attendanceData[i]) ? attendanceData[i].check_out : '',
                status: ("status" in attendanceData[i]) ? attendanceData[i].status : true,
            };
        }
        setStatus(statusData);
    }

    useEffect(() => {
        setNewData()
    }, [attendanceDate, employees, attendance])

    const handleStatusChange = (e, emp_id) => {
        const { name, type } = e.target;
        var newValue = null;

        const newStatus = [...status];
        const searched = newStatus.find((emp) => emp.id == emp_id);

        if (type == 'checkbox') {
            const { checked } = e.target;
            newValue = checked;
            if (newValue) {
                searched['leave_id'] = null;
            }
        } else if (type == 'select-one') {
            const { value } = e.target;
            newValue = value;
            if (newValue == "Absent") {
                newValue == null;
            }
        }
        else {
            const { value } = e.target;
            newValue = value;
        }
        searched[name] = newValue;
        setStatus(newStatus);
    }

    const submitAttendance = () => {
        setSaving(true);
        setLoading(true)
        const setDated = attendanceDate ? `?dated=${attendanceDate}` : '';
        axios({
            method: 'post',
            url: `/api/attendance${setDated}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                status: status
            }
        }).then((res) => {
            setSaving(false);
            setLoading(false);
            fecthAttendance();
        }).catch((err) => {
            setSaving(false);
            setLoading(false);
        })
    }
    const updateAttendance = () => {
        setSaving(true);
        setLoading(true);
        axios({
            method: 'put',
            url: '/api/attendance/update',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                status: status
            }
        }).then((res) => {
            // console.log(res);
            setSaving(false);
            setLoading(false);
            fecthAttendance();
        }).catch((err) => {
            // console.log(err)
            setSaving(false);
            setLoading(false);
        })
    }


    return (
        <div className='contain-table'>
            <div style={{ marginTop: '30px', fontWeight: '200', fontSize: '18px', color: 'white', backgroundColor: '#1caf9a', width: '100%', padding: '7px 15px' }}>
                <BusinessCenterIcon style={{ fontSize: '20px', }} /> Attendance
            </div>

            <div style={{ marginTop: '', border: '1px solid #1caf9a', padding: '10px' }}>
                {loading ? <Loader1 /> : (<>
                    <TableContainer>
                        <Table sx={{ maxWidth: '100%' }} size="small" aria-label="Employee Table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>EmployeeId</TableCell>
                                    <TableCell>NAME</TableCell>
                                    <TableCell>STATUS</TableCell>
                                    <TableCell>TIME IN</TableCell>
                                    <TableCell>TIME OUT</TableCell>
                                    <TableCell>Leave / Absent</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {status.length > 0 ? (
                                    status.map((employee, i) => (
                                        <TableRow key={employee.employee_id}>
                                            <TableCell>{employee.employee_id}</TableCell>
                                            <TableCell>{employee.name}</TableCell>
                                            <TableCell><Switch color='success' name='status' checked={employee.status} onChange={(e) => handleStatusChange(e, employee.id)} /></TableCell>
                                            <TableCell>
                                                <input name='check_in' value={employee.check_in} type='time' onChange={(e) => handleStatusChange(e, employee.id)} />
                                            </TableCell>
                                            <TableCell>
                                                <input name='check_out' value={employee.check_out} type='time' onChange={(e) => handleStatusChange(e, employee.id)} />
                                            </TableCell>
                                            <TableCell>
                                                <select
                                                    value={employee.leave_id == null ? 'Absent' : employee.leave_id}
                                                    style={{ visibility: employee.status ? "hidden" : 'visible' }}
                                                    name={'leave_id'} onChange={(e) => handleStatusChange(e, employee.id)}>
                                                    <option value={'Absent'}>Absent</option>
                                                    {
                                                        leaves.map((data) => (
                                                            <option key={data.id} value={data.id}>{data.reason}</option>
                                                        ))
                                                    }

                                                </select>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <tr>
                                        <TableCell colSpan={7}>No Employees</TableCell>
                                    </tr>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <LoadingButton loading={saving} onClick={attendance.length < 1 ? submitAttendance : updateAttendance} variant="contained" color="success">
                        Submit
                    </LoadingButton> </>)
                }
            </div>

        </div>

    )
}

const mapStateToProps = (state) => ({
    role: state.role.currentRole,
    permission: state.permission.currentPermission,
});
  
export default connect(mapStateToProps)(List);
