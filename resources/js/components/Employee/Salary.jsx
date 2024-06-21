import React from 'react'
import { Alert, Chip, IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import NewSalary from './forms/NewSalary';
import DeleteIcon from '@mui/icons-material/Delete';
import { connect } from 'react-redux';

function Salary({ listing, employeeId, reRender, token }) {

    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/employee/${employeeId}/salary/${id}`, {
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
        // fecthData()
    }

    const handleStatus = async (id) => {
        await axios({
            method: 'post',
            url: `/api/employee/${employeeId}/salary/status/${id}`,
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            reRender();
        }).catch((err) => {
            console.log(err)
        })
        // fecthData()
    }

    return (
        <div style={{ width: '90%', border: '1px solid #4b8df8', padding: '0px', }}>
            <div style={{ background: '#4b8df8', height: '60px', color: 'white', display: 'flex', alignItems: 'center', padding: '30px', justifyContent: 'space-between' }}>
                <h6 className='text-center'>Salary History</h6>
                <button onClick={handleClickOpen} className='btn-sm' style={{ background: '#ffaa24', border: 'none' }} >New</button>
            </div>
            <TableContainer component={Paper} sx={{ padding: 1 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Basic Salary</TableCell>
                            <TableCell>Dated</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listing.map((salary, i) =>
                            <TableRow>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{salary.basic}</TableCell>
                                <TableCell>{salary.created_at}</TableCell>
                                <TableCell>{!salary.status ?
                                    <Chip onClick={() => handleStatus(salary.id)} size='small' color='error' label={'Inactive'} />
                                    :
                                    <Chip size='small' color='success' label={'Active'} />
                                }</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(salary.id)} size='small' color='primary' >
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
                    Salary Deleted!
                </Alert>
            </Snackbar>
            <NewSalary reRender={reRender} employeeId={employeeId} open={open} handleClose={handleClose} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    user: state.user.userData
});

export default connect(mapStateToProps)(Salary);
