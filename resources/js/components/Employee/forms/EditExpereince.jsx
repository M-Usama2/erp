import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export default function EditExpereince({ open, handleClose, exp_id, reRender, token, data }) {

    const [organization, setOrganization] = useState(data.organization);
    const [start_date, setStartDate] = useState(data.start_date);
    const [end_date, setEndDate] = useState(data.end_date);
    const [position, setPosition] = useState(data.position);
    const [leaving_reasons, setReason] = useState(data.leaving_reasons);

    useEffect(() => {
        setOrganization(data.organization);
        setStartDate(data.start_date);
        setEndDate(data.end_date);
        setPosition(data.position);
        setReason(data.leaving_reasons);
    }, [data])


    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: "put",
            url: `/api/employee/exp/update/${exp_id}`,
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {

                    organization: organization,
                    start_date: start_date,
                    end_date: end_date,
                    position: position,
                    leaving_reasons: leaving_reasons

            }
        }
        ).then(async function (res) {
            console.log(res);
            if (res) {
                setOrganization('');
                setStartDate('');
                setEndDate('');
                setPosition('');
                setReason('');
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
                <DialogTitle>Edit Experience</DialogTitle>
                <form onSubmit={handleSubmit} method='POST'>
                    <DialogContent>
                        <DialogContentText>
                            Enter following to Edit Experience record.
                        </DialogContentText>

                        <label>Experience</label>
                        <input value={organization} autoFocus placeholder="Experience" type="text" onChange={(e) => setOrganization(e.target.value)} required />
                        <label>Position</label>
                        <input value={position} placeholder="Position" type="text" onChange={(e) => setPosition(e.target.value)} required />
                        <label>Reason for Leaving</label>
                        <input value={leaving_reasons} placeholder="Reason For Leaving" type="text" onChange={(e) => setReason(e.target.value)} required />

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
                        <Button type={'submit'}>Update</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
