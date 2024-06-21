import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'



const Add = ({ token }) => {

    const [reason, SetReason] = useState('');
    const navigate = useNavigate();

    const [number_of_leaves, setNOD] = useState(0);

    function Submit(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/api/leaves',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                reason: reason,
                number_of_leaves: number_of_leaves,
            }
        }).then((res) => {
            navigate('/leaves');
            console.log(res)
        }).catch((err) => {
            console.log(err)
           
        })

    }

    function close(id) {
        const items = leave.filter((item) => item !== id)
        setDesignations(items);
    }

    return (

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '40px' }}>
            <div style={{ width: '90%', border: '1px solid grey', padding: '20px' }}>
                <Breadcrumbs style={{ background: '#f7f7f7', padding: '7px 10px', marginBottom: '20px' }} aria-label="breadcrumb">
                    <Link style={{ fontSize: '13px', display: 'flex', alignItems: 'center', color: '#9a8888' }} to="/">
                        <HomeIcon style={{ fontSize: '20px', marginRight: '10px' }} />  Dashboard
                    </Link>
                    <Link
                        style={{ fontSize: '13px', color: '#9a8888' }}
                        to="/leaves"
                    >
                        Leaves
                    </Link>
                </Breadcrumbs>
                <h4>Add Leave</h4>
                <form onSubmit={Submit}>
                    <div className='row'>
                        <div className='col-12'>
                            <input required type="text" placeholder='Leave' value={reason} onChange={(e) => { SetReason(e.target.value) }} />
                        </div>
                        <div className={'col-12'}>
                            <input type='number' value={number_of_leaves} onChange={(e) => { setNOD(e.target.value) }} required />
                        </div>
                    </div>
                    <button type='submit' className='mt-4' style={{ borderRadius: '0', backgroundColor: '#1caf9a', border: 'none', fontWeight: '200' }}>Submit</button>
                    <ToastContainer />
                </form>
            </div>
        </div>


    )
}
const mapStateToProps = (state) => ({
    token: state.user.currentUser,
});
export default connect(mapStateToProps)(Add)
