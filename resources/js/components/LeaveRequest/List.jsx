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
import DeleteDialog from '../template/dialogs/DeleteDialog';
import { useState } from 'react';
import { connect } from 'react-redux'

function List({ leave_requests, handleDelete, role, permission, approveRequest,filters, setFilters}) {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: null
    });

    const params = useParams();


    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteID] = useState(null);

    function openDeleteDialog(id, open = true) {
        setDeleteID(id);
        setOpenDelete(open);
    }

    const checkPermission = (name) => role?.includes("super-admin") || permission?.includes(name);

    return (
        <div className='contain-table'>
            <div style={{ marginTop: '30px', fontWeight: '200', fontSize: '18px', color: 'white', backgroundColor: '#4b8df8', width: '100%', padding: '7px 15px' }}>
                <BusinessCenterIcon style={{ fontSize: '20px', }} /> Leave Request List
            </div>

            <div style={{ marginTop: '', border: '1px solid #4b8df8', padding: '10px' }}>
                {/* Filters */}
                <div className='row'>
                    <div className='col-md-3'>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                    </div>
                    <div className='col-md-3'>
                        <select
                            className="form-control"
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    <div className='col-md-3'>
                        <input
                            type="date"
                            className="form-control"
                            value={filters.start_date}
                            onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
                        />
                    </div>
                    <div className='col-md-3'>
                        <input
                            type="date"
                            className="form-control"
                            value={filters.end_date}
                            onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
                        />
                    </div>
                </div>


                <TableContainer>
                    <Table sx={{ minWidth: '100%' }} size="small" aria-label="Leave Request List">
                        <TableHead>
                            <TableRow>
                                <TableCell>NO.</TableCell>
                                <TableCell>Employee</TableCell>
                                <TableCell>Reason</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>Approved/Rejected</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {leave_requests.length > 0 ? (
                                leave_requests.map((leave_request, i) => (
                                    <TableRow key={leave_request.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{leave_request?.employee?.name}</TableCell>
                                        <TableCell>{leave_request.reason}</TableCell>
                                        <TableCell>{leave_request.start_date_formatted}</TableCell>
                                        <TableCell>{leave_request.end_date_formatted}</TableCell>
                                        <TableCell>{
                                            leave_request.status === 'pending'
                                                ? (
                                                    <div>
                                                        <button className='btn btn-sm btn-success'
                                                            onClick={() => approveRequest(leave_request.id)}
                                                        >Approve</button>
                                                        <button className='btn btn-sm btn-danger'
                                                            onClick={() => approveRequest(leave_request.id, true)}
                                                        >Reject</button>
                                                    </div>
                                                )
                                                : leave_request.status.toUpperCase()
                                        }</TableCell>
                                        <TableCell className="text-left">

                                            <Link
                                                to={`/leaveRequests/${leave_request.id}`}

                                                className="button muted-button edit"
                                                style={{ marginRight: '10px', color: 'white', background: '#8e44ad', padding: '7px 9px', textAlign: 'center', fontSize: '13px', fontWeight: '200', border: 'none', borderRadius: '0' }}
                                            >
                                                <EditIcon style={{ color: 'white', marginBottom: '3px', fontSize: '15px' }} /> View/Edit

                                            </Link>


                                            <button
                                                // onClick={() => handleDelete(leave_request.id)}
                                                onClick={() => openDeleteDialog({ id: leave_request.id, reason: leave_request.reason })}
                                                className="button muted-button delete"
                                                style={{ fontWeight: '200', color: 'white', padding: '7px 9px', fontSize: '13px', border: 'none', borderRadius: '0', background: '#c63927' }}
                                            >
                                                <DeleteIcon style={{ marginBottom: '3px', color: 'white', fontSize: '15px' }} /> Delete
                                            </button>



                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7}>No Leave Request</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            <DeleteDialog
                title='Delete?'
                content={`Do you wish to delete Leave Request ${deleteId ? deleteId.reason : null}`}
                titleYes='Delete'
                open={openDelete}
                handleAction={() => {
                    handleDelete(deleteId ? deleteId.id : null);
                    openDeleteDialog(null, false);
                }
                }
                handleClose={() => {
                    openDeleteDialog(null, false);
                }
                } />
        </div>

    )
}

const mapStateToProps = (state) => ({
    role: state.role.currentRole,
    permission: state.permission.currentPermission
});

export default connect(mapStateToProps)(List)
