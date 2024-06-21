import { Snackbar } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

function BankAccount({ employeeId, bank = null, token }) {

    const [account_title, setAccountTitle] = useState('');
    const [account_number, setAccountNumber] = useState('');
    const [iban_number, setIBANNumber] = useState('');

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    async function Submit(e) {
        e.preventDefault();
        // const token = this.props.token;
        try {
            const response = await axios({
                method: "post",
                url: `/api/employee/${employeeId}/bank`,
                data: {
                    account_title: account_title,
                    account_number: account_number,
                    iban_number: iban_number
                },
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            }).then((e) => {
                setOpen(true)
            });
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(bank)
        if (bank) {
            setAccountTitle(bank.account_title);
            setAccountNumber(bank.account_number);
            setIBANNumber(bank.iban_number);
        }
    }, [])


    return (
        <div style={{ width: '90%', border: '1px solid #4b8df8', padding: '0px', }}>
            <div style={{ background: '#4b8df8', height: '60px', color: 'white', display: 'flex', alignItems: 'center', padding: '30px', justifyContent: 'space-between' }}>
                <h6 className='text-center'>Bank Account</h6>
            </div>
            <form onSubmit={Submit} style={{ padding: '20px', }} className='sm'>
                <label>Account Title :</label>
                <input required type="text" onChange={e => setAccountTitle(e.target.value)} placeholder='Account Title' value={account_title} />
                <label>Account Number :</label>
                <input required type="text" onChange={e => setAccountNumber(e.target.value)} placeholder='Account Title' value={account_number} />
                <label>IBAN Number :</label>
                <input required type="text" onChange={e => setIBANNumber(e.target.value)} placeholder='Account Title' value={iban_number} />
                <br />
                <button type='submit' style={{ backgroundColor: '#4b8df8', border: 'none' }}>Submit</button>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message="Bank Details Saved!"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    user: state.user.userData
});

export default connect(mapStateToProps)(BankAccount);
