import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'
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
import Loader1 from '../template/loaders/Loader1';
import { Snackbar } from '@mui/material';

function List({ expense, token, fecthData, role, permission }) {

    console.log(expense);


    const [loading, setLoading] = useState(false);


    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteID] = useState(null);


    const [open, setOpen] = useState(false);
    const toggleMessage = () => {
        setOpen(!open);
    };

    const changeStatus = async (status, id) => {
        await axios({
            method: "put",
            url: '/api/expense/setStatus/' + id,
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                status: status
            }
        }).then((res) => {
            fecthData();
            toggleMessage();
        }).catch((err) => {
            console.log(err)
        })
    }


    const handleDelete = async (id) => {
        setLoading(true)
        await axios.delete('/api/expense/' + id, {
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            fecthData();
            setLoading(false);
        }).catch((err) => {
            console.log(err)
            setLoading(false);

        })
    }

    function openDeleteDialog(id, open = true) {
        setDeleteID(id);
        setOpenDelete(open);
    }

    const checkPermission = (name) => role.includes("super-admin") || permission.includes(name);

    return (
        <>
            <div className='contain-table'>
                <div style={{ marginTop: '30px', fontWeight: '200', fontSize: '18px', color: 'white', backgroundColor: '#4b8df8', width: '100%', padding: '7px 15px' }}>
                    <BusinessCenterIcon style={{ fontSize: '20px', }} /> Expense List
                </div>

                <div style={{ border: '1px solid #4b8df8', padding: '10px' }}>

                    {loading ? <Loader1 /> :
                        <TableContainer>
                            <Table sx={{ minWidth: '100%' }} size="small" aria-label="roles List">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>NO.</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Note</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {expense.length > 0 ? (
                                        expense.map((res, i) => (
                                            <TableRow key={res.id}>
                                                <TableCell>{i + 1}</TableCell>
                                                <TableCell>{res.expenseType.name}</TableCell>
                                                <TableCell>{res.amount}</TableCell>
                                                <TableCell>{res.note}</TableCell>
                                                <TableCell>
                                                    <select
                                                        onChange={(e) => {
                                                            changeStatus(e.target.value, res.id);
                                                        }}
                                                        value={res.status}>
                                                        <option>PENDING</option>
                                                        <option>APPROVED</option>
                                                        <option>NOT APPROVED</option>
                                                    </select>
                                                </TableCell>
                                                <TableCell className="text-left">


                                                    <Link
                                                        to={`/expense/update/${res.id}`}

                                                        className="button muted-button edit"
                                                        style={{ marginRight: '10px', color: 'white', background: '#8e44ad', padding: '7px 9px', textAlign: 'center', fontSize: '13px', fontWeight: '200', border: 'none', borderRadius: '0' }}
                                                    >
                                                        <EditIcon style={{ color: 'white', marginBottom: '3px', fontSize: '15px' }} /> View/Edit

                                                    </Link>


                                                    <button
                                                        onClick={() => openDeleteDialog({ id: res.id })}
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
                                            <TableCell colSpan={7}>No Expense Type</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </div>
                <DeleteDialog
                    title='Delete?'
                    content={`Do you wish to delete expense ${deleteId ? deleteId.id : null}`}
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
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={toggleMessage}
                message="Status Updated!"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            />
        </>

    )
}

const mapStateToProps = (state) => ({
    role: state.role.currentRole,
    permission: state.permission.currentPermission
})

export default connect(mapStateToProps)(List);
