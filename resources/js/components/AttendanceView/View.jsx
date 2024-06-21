import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TableRow from '@mui/material/TableRow';
import DescriptionIcon from '@mui/icons-material/Description';
import { CSVLink } from 'react-csv'

function View({ employees, pagination, machineData}) {

    const headers = [
        { label: 'EmployeeID', key: 'id' },
        { label: 'Name', key: 'name' },
    ]

    return (
        <div className='contain-table'>

            <div style={{ marginTop: '30px', fontWeight: '200', fontSize: '18px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1caf9a', width: '100%', padding: '7px 15px' }}>
                <div>

                    <PeopleAltIcon style={{ fontSize: '22px', }} /> Employees List
                </div>
                <div className='d-flex'>

                    <button onClick={machineData} className='m-1' style={{ border: 'none', borderRadius: '0', display: 'flex', alignItems: 'center', padding: '4px 13px', background: '#8e44ad', color: 'white', fontWeight: '200', }}> Refresh</button>
                    <CSVLink data={employees} headers={headers}>
                        <button className='m-1' style={{ border: 'none', borderRadius: '0', display: 'flex', alignItems: 'center', padding: '4px 13px', background: '#ffaa24', color: 'white', fontWeight: '200', }}> <DescriptionIcon style={{ padding: '5px', fontSize: '30px', }} /> Export</button>
                    </CSVLink>
                </div>
            </div>
            <div style={{ marginTop: '', border: '1px solid #1caf9a', padding: '10px' }}>


                <TableContainer>
                    <Table sx={{ maxWidth: '100%' }} size="small" aria-label="Employee Table">
                        <TableHead>
                            <TableRow>
                                <TableCell>EmployeeID.</TableCell>
                                <TableCell>NAME</TableCell>
                                <TableCell sx={{ backgroundColor: 'lightgreen' }}>Present</TableCell>
                                <TableCell sx={{ backgroundColor: 'blue' }}>Late</TableCell>
                                <TableCell sx={{ backgroundColor: 'red' }}>Absent</TableCell>
                                <TableCell sx={{ backgroundColor: 'lightblue' }}>Leave</TableCell>
                                <TableCell sx={{ backgroundColor: 'lightgray' }}><b>Total</b></TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.length > 0 ? (
                                employees.map((employee, i) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>{employee.id}</TableCell>
                                        <TableCell><Link target='_blank'
                                            to={`/employees/update/${employee.id}`}
                                        >{employee.name}</Link></TableCell>
                                        <TableCell>{employee.attendance_count.present}</TableCell>
                                        <TableCell>{employee.attendance_count.late}</TableCell>
                                        <TableCell>{employee.attendance_count.absent}</TableCell>
                                        <TableCell>{employee.attendance_count.leave}</TableCell>
                                        <TableCell><b>{employee.attendance_count.total}</b></TableCell>
                                        {/* <TableCell>
                                            <ul>
                                                <li>Present : {employee.attendance_count.present}</li>
                                                <li>Absent : {employee.attendance_count.absent}</li>
                                                <li>Leaves : {employee.attendance_count.leave}</li>
                                                <li><b>Total : {employee.attendance_count.total}</b></li>
                                            </ul>
                                        </TableCell> */}
                                        <TableCell>
                                            <Link
                                                to={`/viewattendance/show/${employee.id}`}
                                                className="btn btn-sm btn-outline-primary">View</Link>
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
                <div>
                    {
                        pagination
                    }
                </div>
            </div>
        </div>

    )
}

export default View
