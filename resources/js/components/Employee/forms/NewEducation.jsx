import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import axios from 'axios';

export default function NewEducation({ open, handleClose, employeeId, reRender, token }) {

    const [certification, setCertification] = useState(null);
    const [start_date, setStartDate] = useState(null);
    const [end_date, setEndDate] = useState(null);
    const [grade, setGrading] = useState(null);
    const [marking, setMarking] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: `/api/employee/education/add/${employeeId}`,
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                education: [{
                    certification: certification,
                    start_date: start_date,
                    end_date: end_date,
                    grade: grade,
                    marking: marking
                }]
            }
        }
        ).then(async function (res) {
            console.log(res);
            if (res) {
                setCertification('');
                setStartDate('');
                setEndDate('');
                setGrading('');
                setMarking('');
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
                <DialogTitle>New Education</DialogTitle>
                <form onSubmit={handleSubmit} method='POST'>
                    <DialogContent>
                        <DialogContentText>
                            Enter following to add a new educational record.
                        </DialogContentText>

                        <label>Certification</label>
                        <input value={certification} autoFocus placeholder="Certification" type="text" onChange={(e) => setCertification(e.target.value)} required />
                        <div className='row'>
                            <div className='col-6'>
                                <label>Grade</label>
                                <input value={grade} placeholder="grading" type="text" onChange={(e) => setGrading(e.target.value)} required />
                            </div>
                            <div className='col-6'>
                                <label>Marking</label>
                                <input value={marking} placeholder="marking" type="text" onChange={(e) => setMarking(e.target.value)} required />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <label>Start Date</label>
                                <input value={start_date} placeholder="start_date" type="date" onChange={(e) => setStartDate(e.target.value)} required />
                            </div>
                            <div className='col-6'>
                                <label>Completion Date</label>
                                <input value={end_date} placeholder="end_date" type="date" onChange={(e) => setEndDate(e.target.value)} required />
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
