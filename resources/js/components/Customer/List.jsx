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

function List({ customers, token, fecthData, role, permission }) {

    const [loading, setLoading] = useState(false);


    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteID] = useState(null);



    const handleDelete = async (id) => {
        setLoading(true)
        await axios.delete('/api/customers/' + id, {
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
                <BusinessCenterIcon style={{ fontSize: '20px', }} /> Customer List
            </div>

            <div style={{ border: '1px solid #4b8df8', padding: '10px' }}>

                <TableContainer>
                    <Table sx={{ minWidth: '100%' }} size="small" aria-label="roles List">
                        <TableHead>
                            <TableRow>
                                <TableCell>NO.</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.length > 0 ? (
                                customers.map((customer, i) => (
                                    <TableRow key={customer.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{customer.name}</TableCell>
                                        <TableCell>{customer.email}</TableCell>
                                        <TableCell>{customer.phone}</TableCell>
                                        <TableCell>{customer.address}</TableCell>
                                        <TableCell className="text-left">


                                            <Link
                                                to={`/customers/update/${customer.id}`}

                                                className="button muted-button edit"
                                                style={{ marginRight: '10px', color: 'white', background: '#8e44ad', padding: '7px 9px', textAlign: 'center', fontSize: '13px', fontWeight: '200', border: 'none', borderRadius: '0' }}
                                            >
                                                <EditIcon style={{ color: 'white', marginBottom: '3px', fontSize: '15px' }} /> View/Edit

                                            </Link>


                                            <button
                                                onClick={() => openDeleteDialog({ id: customer.id })}
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
                                    <TableCell colSpan={7}>No Customers</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            <DeleteDialog
                title='Delete?'
                content={`Do you wish to delete Customer ${deleteId ? deleteId.id : null}`}
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
