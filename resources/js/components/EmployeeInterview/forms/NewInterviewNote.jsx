import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import axios from 'axios';
import Switch from '@mui/material/Switch';

export default function NewInterviewNote({ open, handleClose, employeeId, interview_id, reRender, token }) {

    const [note, setNote] = useState(null);
    const [pass, setPass] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: "post",
            url: `/api/interview_notes/${interview_id}`,
            data: {
                notes: note,
                pass: pass,
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        ).then(async function (res) {
            console.log(res);
            if (res) {
                setPass(true);
                setNote('');
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
                <DialogTitle>Add A Note</DialogTitle>
                <form onSubmit={handleSubmit} method='POST'>
                    <DialogContent>
                        <DialogContentText>
                            Enter following to add a new Note to interview.
                        </DialogContentText>
                        <label>Note</label>
                        <textarea placeholder='Enter Note' onChange={(e) => setNote(e.target.value)} required>{note}</textarea>
                        <label>Pass</label>
                        <Switch color='success' name='status' checked={pass} onChange={(e) => setPass(!pass)} />
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
