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

function NewDocument({ open, handleClose, employeeId, reRender,token }) {

    const [title, setTitle] = useState(null);
    const [document, setDocument] = useState(null);

    const handleFileSelect = (event) => {
        setDocument(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        const formData = new FormData();
        formData.append("document", document);
        formData.append("title", title);
        event.preventDefault();
        try {
            const response = await axios({
                method: "post",
                url: `/api/employee/document/add/${employeeId}`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            }).then((e) => {
                reRender();
                handleClose();
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Experience</DialogTitle>
                <form onSubmit={handleSubmit} method='POST'>
                    <DialogContent>
                        <DialogContentText>
                            Enter following to add a new Document.
                        </DialogContentText>
                        <label>TItle</label>
                        <input value={title} autoFocus placeholder="TItle" type="text" onChange={(e) => setTitle(e.target.value)} required />
                        <label>Document</label>
                        <input type="file" name='document' style={{ margin: '10px 0px 20px 0px' }} placeholder='Document' onChange={handleFileSelect} required />
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

export default connect(mapStateToProps)(NewDocument);
