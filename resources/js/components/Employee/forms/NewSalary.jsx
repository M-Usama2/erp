import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

function NewSalary({ open, handleClose, employeeId, reRender, token }) {

    const [basic, setBasic] = useState(null);
    const [created_at, setCreatedAt] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: `/api/employee/${employeeId}/salary`,
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                basic: basic,
                created_at: created_at,
            }
        }
        ).then(async function (res) {
            console.log(res);
            if (res) {
                setBasic('');
                setCreatedAt('');
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
                <DialogTitle>New Salary</DialogTitle>
                <form onSubmit={handleSubmit} method='POST'>
                    <DialogContent>
                        <DialogContentText>
                            Enter following to add a new salary record.
                        </DialogContentText>

                        <label>Baisc</label>
                        <input value={basic} autoFocus placeholder="Basic" type='number' min={1} onChange={(e) => setBasic(e.target.value)} required />

                        <label>Dated</label>
                        <input value={created_at} autoFocus placeholder="Dated" type='date' min={1} onChange={(e) => setCreatedAt(e.target.value)} required />

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

const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    user: state.user.userData
});

export default connect(mapStateToProps)(NewSalary);
