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
import {connect} from 'react-redux'

function List({ announcements, token, fecthData, role , permission }) {

    const [loading, setLoading] = useState(false);


    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteID] = useState(null);



    const handleDelete = async (id) => {
        setLoading(true)
        await axios.delete('/api/announcements/' + id, {
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
                <Announcement style={{ fontSize: '20px', }} /> Announcement List
            </div>

            <div style={{ border: '1px solid #4b8df8', padding: '10px' }}>

                <TableContainer>
                    <Table sx={{ minWidth: '100%' }} size="small" aria-label="roles List">
                        <TableHead>
                            <TableRow>
                                <TableCell>NO.</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Content</TableCell>
                                <TableCell>Publish Date</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {announcements.length > 0 ? (
                                announcements.map((announcement, i) => (
                                    <TableRow key={announcement.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{announcement.title}</TableCell>
                                        <TableCell>{announcement.content}</TableCell>
                                        <TableCell>{announcement.published_at_formatted}</TableCell>
                                        <TableCell className="text-left">

                                                
                                                <Link
                                                to={`/announcements/update/${announcement.id}`}
                                                
                                                className="button muted-button edit"
                                                style={{ marginRight: '10px', color: 'white', background: '#8e44ad', padding: '7px 9px', textAlign: 'center', fontSize: '13px', fontWeight: '200', border: 'none', borderRadius: '0' }}
                                                >
                                                <EditIcon style={{ color: 'white', marginBottom: '3px', fontSize: '15px' }} /> View/Edit

                                            </Link>


                                                <button
                                                onClick={() => openDeleteDialog({ id: announcement.id })}
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
                                    <TableCell colSpan={7}>No Announcements</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            <DeleteDialog
                title='Delete?'
                content={`Do you wish to delete Announcement ${deleteId ? deleteId.id : null}`}
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
