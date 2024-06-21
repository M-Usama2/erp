import React from 'react'
import { Alert, IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import NewEducation from './forms/NewEducation';
import DeleteIcon from '@mui/icons-material/Delete';
import { connect } from 'react-redux';

function Education({ listing, employeeId, reRender, token }) {

    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (id) => {
        await axios.delete('/api/employee/education/' + id, {
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            // console.log('Deleted successfully')
            reRender();
            setOpenDelete(true);
        }).catch((err) => {
            console.log(err)
        })
        fecthData()
    }

    return (
        <div style={{ width: '90%', border: '1px solid #4b8df8', padding: '0px', }}>
            <div style={{ background: '#4b8df8', height: '60px', color: 'white', display: 'flex', alignItems: 'center', padding: '30px', justifyContent: 'space-between' }}>
                <h6 className='text-center'>Education History</h6>
                <button onClick={handleClickOpen} className='btn-sm' style={{ background: '#ffaa24', border: 'none' }} >New</button>
            </div>
            <TableContainer component={Paper} sx={{ padding: 1 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Certification</TableCell>
                            <TableCell>Grading</TableCell>
                            <TableCell>Marking</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>Completion Date</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listing.map((education, i) =>
                            <TableRow>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{education.certification}</TableCell>
                                <TableCell>{education.grade}</TableCell>
                                <TableCell>{education.marking}</TableCell>
                                <TableCell>{education.start_date}</TableCell>
                                <TableCell>{education.end_date}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(education.id)} size='small' color='primary' >
                                        <DeleteIcon style={{ color: '#C70039' }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={openDelete}
                autoHideDuration={3000}
                onClose={() => setOpenDelete(false)}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Education Deleted!
                </Alert>
            </Snackbar>
            <NewEducation token={token} reRender={reRender} employeeId={employeeId} open={open} handleClose={handleClose} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    user: state.user.userData
});

export default connect(mapStateToProps)(Education);
