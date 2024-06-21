import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { Announcement } from '@mui/icons-material';
import TableRow from '@mui/material/TableRow';
import DeleteDialog from '../template/dialogs/DeleteDialog';
import { useState } from 'react';
import { connect } from 'react-redux'

function List({ tickets, token, fecthData, role, permission, filters, setFilters }) {

    const [loading, setLoading] = useState(false);


    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteID] = useState(null);


    const handleDelete = async (id) => {
        setLoading(true)
        await axios.delete('/api/tickets/' + id, {
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            // console.log('Deleted successfully')
            fecthData();
        }).catch((err) => {
            console.log(err)
        })
    }

    function openDeleteDialog(id, open = true) {
        setDeleteID(id);
        setOpenDelete(open);
    }

    const checkPermission = (name) => role.includes("super-admin") || permission.includes(name);

    return (
        <div className='contain-table'>
            <div style={{ marginTop: '30px', fontWeight: '200', fontSize: '18px', color: 'white', backgroundColor: '#4b8df8', width: '100%', padding: '7px 15px' }}>
                <Announcement style={{ fontSize: '20px', }} /> Ticket List
            </div>

            <div style={{ border: '1px solid #4b8df8', padding: '10px' }}>
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
                            <option value="">Status</option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                    <div className='col-md-3'>
                        <select
                            className="form-control"
                            value={filters.priority}
                            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                        >
                            <option value="">Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className='col-md-3'>
                        <input
                            type="date"
                            className="form-control"
                            value={filters.created_at}
                            onChange={(e) => setFilters({ ...filters, created_at: e.target.value })}
                        />
                    </div>
                </div>
                {/* End Filters */}
                <TableContainer>
                    <Table sx={{ minWidth: '100%' }} size="small" aria-label="roles List">
                        <TableHead>
                            <TableRow>
                                <TableCell>NO.</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Priority</TableCell>
                                <TableCell>Creation Date</TableCell>
                                <TableCell>Created By</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.length > 0 ? (
                                tickets.map((ticket, i) => (
                                    <TableRow key={ticket.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{ticket.title}</TableCell>
                                        <TableCell>{ticket.description}</TableCell>
                                        <TableCell>{ticket.status}</TableCell>
                                        <TableCell>{ticket.priority}</TableCell>
                                        <TableCell>{ticket.created_at_formatted}</TableCell>
                                        <TableCell>{ticket?.user?.name}</TableCell>
                                        <TableCell className="text-left">
                                            <Link
                                                to={`/tickets/update/${ticket.id}`}

                                                className="button muted-button edit"
                                                style={{ marginRight: '10px', color: 'white', background: '#8e44ad', padding: '7px 9px', textAlign: 'center', fontSize: '13px', fontWeight: '200', border: 'none', borderRadius: '0' }}
                                            >
                                                <EditIcon style={{ color: 'white', marginBottom: '3px', fontSize: '15px' }} /> View/Edit

                                            </Link>


                                            <button
                                                onClick={() => openDeleteDialog({ id: ticket.id })}
                                                // onClick={() => handleDelete(role.id)}
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
                                    <TableCell colSpan={7}>No Tickets</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            <DeleteDialog
                title='Delete?'
                content={`Do you wish to delete Ticket ${deleteId ? deleteId.id : null}`}
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
})

export default connect(mapStateToProps)(List);
