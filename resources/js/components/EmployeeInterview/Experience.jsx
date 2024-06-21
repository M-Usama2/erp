import React from 'react'
import { Alert, IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import NewExpereince from './forms/NewExpereince';
import { connect } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';



function Experience({ listing, employeeId, reRender, token }) {


    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (id) => {
        await axios.delete('/api/employee/exp/' + id, {
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
            <div style={{ background: '#4b8df8', height: '60px', color: 'white', display: 'flex', alignItems: 'center', padding: '30px', display: 'flex', justifyContent: 'space-between' }}>
                <h6 className='text-center'>Experience History</h6>
                <button onClick={handleClickOpen} className='btn-sm' style={{ background: '#ffaa24', border: 'none' }}>New</button>
            </div>
            <TableContainer component={Paper} sx={{ padding: 1 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>organization</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Leaving Reasons</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>Completion Date</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listing.map((exp, i) =>
                            <TableRow>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{exp.organization}</TableCell>
                                <TableCell>{exp.position}</TableCell>
                                <TableCell>{exp.leaving_reasons}</TableCell>
                                <TableCell>{exp.start_date}</TableCell>
                                <TableCell>{exp.end_date}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(exp.id)} size='small' color='primary' >
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
                    Experience Record Deleted!
                </Alert>
            </Snackbar>
            <NewExpereince token={token} reRender={reRender} employeeId={employeeId} open={open} handleClose={handleClose} />

        </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    user: state.user.userData
});

export default connect(mapStateToProps)(Experience);
