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
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import {connect} from 'react-redux'

function List({ holidays, handleEdit, handleDelete, role, permission }) {

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
            if(open == false){
                toast.error('Deleted Successfully')
            }
            
        }
        
        const checkPermission = (name) => role?.includes("super-admin") || permission?.includes(name);
        
    return (
        <div className='contain-table'>
            <div style={{ marginTop: '30px', fontWeight: '200', fontSize: '18px', color: 'white', backgroundColor: '#1caf9a', width: '100%', padding: '7px 15px' }}>
                <BusinessCenterIcon style={{ fontSize: '20px', }} /> Holiday List
            </div>

            <div style={{ marginTop: '', border: '1px solid #1caf9a', padding: '10px' }}>

                <TableContainer>
                    <Table sx={{ minWidth: '100%' }} size="small" aria-label="Holiday List">
                        <TableHead>
                            <TableRow>
                                <TableCell>NO.</TableCell>
                                <TableCell>Occasion</TableCell>
                                <TableCell>Dated</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {holidays.length > 0 ? (
                                holidays.map((holiday, i) => (
                                    <TableRow key={holiday.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{holiday.occasion}</TableCell>
                                        <TableCell>{holiday.dated}</TableCell>
                                        <TableCell className="text-left">
                                        {checkPermission("edit holiday") ? (

                                            <Link
                                                to={`/holidays/${holiday.id}`}

                                                className="button muted-button edit"
                                                style={{ marginRight: '10px', color: 'white', background: '#8e44ad', padding: '7px 9px', textAlign: 'center', fontSize: '13px', fontWeight: '200', border: 'none', borderRadius: '0' }}
                                            >
                                                <EditIcon style={{ color: 'white', marginBottom: '3px', fontSize: '15px' }} /> View/Edit

                                            </Link>
                                        ) : null}

                                        {checkPermission("delete holiday") ? (

                                            <button
                                                // onClick={() => handleDelete(holiday.id)}
                                                onClick={() => openDeleteDialog({ id: holiday.id, occasion: holiday.occasion })}
                                                className="button muted-button delete"
                                                style={{ fontWeight: '200', color: 'white', padding: '7px 9px', fontSize: '13px', border: 'none', borderRadius: '0', background: '#c63927' }}
                                            >
                                                <DeleteIcon style={{ marginBottom: '3px', color: 'white', fontSize: '15px' }} /> Delete
                                            </button>
                                        ) : null}

                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7}>No Holiday</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            <DeleteDialog
                title='Delete?'
                content={`Do you wish to delete Holiday ${deleteId ? deleteId.occasion : null}`}
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
                <ToastContainer />
        </div>

    )
}

const mapStateToProps = (state) => ({
    role: state.role.currentRole,
    permission: state.permission.currentPermission
})

export default connect(mapStateToProps)(List)
