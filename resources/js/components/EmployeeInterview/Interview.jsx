import React from 'react'
import { Alert, IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import NewInterview from './forms/NewInterview';
import { connect } from 'react-redux';
import InterviewRow from './layout/interviewRow';
import NewInterviewNote from './forms/NewInterviewNote';
import { useNavigate } from 'react-router-dom';

function Interview({ listing, employeeId, reRender, token }) {

    const [open, setOpen] = React.useState(false);
    const [openNote, setOpenNote] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [interview_id, setInterviewID] = React.useState(null);
    const navigate = useNavigate();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleOpenNote = (interview_id) => {
        setInterviewID(interview_id);
        setOpenNote(true)
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleNoteClose = () => {
        setOpenNote(false);
    };

    const handleStatus = async () => {
        await axios({
            method: 'put',
            url: '/api/interview/' + employeeId + '/hired',
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                hired: 1
            }
        }).then(() => {
            navigate(`/employees/update/${employeeId}`);
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleDelete = async (id) => {
        await axios.delete('/api/interview/' + id, {
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
                <h6 className='text-center'>Interview Process</h6>
                <div>
                    <button onClick={handleStatus} className='btn-sm' style={{ background: '#4B6F44', border: 'none', marginRight: '4px' }} >Pass</button>
                    <button onClick={handleClickOpen} className='btn-sm' style={{ background: '#ffaa24', border: 'none' }} >New</button>
                </div>
            </div>
            <TableContainer component={Paper} sx={{ padding: 1 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>No.</TableCell>
                            <TableCell>Time In</TableCell>
                            <TableCell>Time Out</TableCell>
                            <TableCell>Dated</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listing.map((interview, i) =>
                            <InterviewRow handleOpenNote={handleOpenNote} index={i} handleDelete={handleDelete} interview={interview} />
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
                    Interview Deleted!
                </Alert>
            </Snackbar>
            <NewInterview token={token} reRender={reRender} employeeId={employeeId} open={open} handleClose={handleClose} />
            <NewInterviewNote token={token} reRender={reRender} employeeId={employeeId} open={openNote} interview_id={interview_id} handleClose={handleNoteClose} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    user: state.user.userData
});

export default connect(mapStateToProps)(Interview);
