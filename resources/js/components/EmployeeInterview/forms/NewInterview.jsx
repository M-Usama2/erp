import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import axios from 'axios';

export default function NewInterview({ open, handleClose, employeeId, reRender,token }) {

    const [start_date, setStartDate] = useState(null);
    const [end_date, setEndDate] = useState(null);
    const [dated, setDated] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method:"post",
            url: `/api/interview/${employeeId}`,
            data: {
                start_date: start_date,
                end_date: end_date,
                dated: dated,
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        ).then(async function (res) {
            console.log(res);
            if (res) {
                setStartDate('');
                setEndDate('');
                reRender();
                handleClose();
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Interview Schedule</DialogTitle>
                <form onSubmit={handleSubmit} method='POST'>
                    <DialogContent>
                        <DialogContentText>
                            Enter following to add a new Interview Schedule.
                        </DialogContentText>
                        <label>Start Date</label>
                        <input value={dated} placeholder="Dated" type="date" onChange={(e) => setDated(e.target.value)} required />
                        <div className='row'>
                            <div className='col-6'>
                                <label>Start Time</label>
                                <input value={start_date} placeholder="start_date" type="time" onChange={(e) => setStartDate(e.target.value)} required />
                            </div>
                            <div className='col-6'>
                                <label>Conclusion Time</label>
                                <input value={end_date} placeholder="end_date" type="time" onChange={(e) => setEndDate(e.target.value)} required />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type={'submit'}>Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
