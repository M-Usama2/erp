import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import TableRow from '@mui/material/TableRow';

function List({ settings }) {
    const params = useParams();

    return (
        <div className='contain-table'>
            <div style={{ marginTop: '30px', fontWeight: '200', fontSize: '18px', color: 'white', backgroundColor: '#1caf9a', width: '100%', padding: '7px 15px' }}>
                <BusinessCenterIcon style={{ fontSize: '20px', }} /> Attendance Time Setting List
            </div>

            <div style={{ marginTop: '', border: '1px solid #1caf9a', padding: '10px' }}>

                <TableContainer>
                    <Table sx={{ minWidth: '100%' }} size="small" aria-label="AttendanceSetting List">
                        <TableHead>
                            <TableRow>
                                <TableCell>NO.</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Title / Name</TableCell>
                                <TableCell>In Time</TableCell>
                                <TableCell>Out Time</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {settings.length > 0 ? (
                                settings.map((setting, i) => (
                                    <TableRow key={setting.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>
                                            {
                                                setting.employee ? 'Employee Setting'
                                                    : setting.designation ? 'Designation Setting'
                                                        : setting.department ? 'Department Setting'
                                                            : 'Default Setting'
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                setting.employee ? setting.employee.name
                                                    : setting.designation ? setting.designation.title
                                                        : setting.department ? setting.department.title
                                                            : 'Default'
                                            }
                                        </TableCell>
                                        <TableCell>{setting.check_in_front}</TableCell>
                                        <TableCell>{setting.check_out_front}</TableCell>
                                        <TableCell className="text-left">
                                            <Link
                                                to={`/attendance/settings/${setting.id}`}

                                                className="button muted-button edit"
                                                style={{ marginRight: '10px', color: 'white', background: '#8e44ad', padding: '7px 9px', textAlign: 'center', fontSize: '13px', fontWeight: '200', border: 'none', borderRadius: '0' }}
                                            >
                                                <EditIcon style={{ color: 'white', marginBottom: '3px', fontSize: '15px' }} /> View/Edit

                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7}>No Attendance Setting</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </div>

    )
}

export default List
