import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { Breadcrumbs } from '@mui/material';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'



const Add = ({ token }) => {

    const [occasion, SetOccasion] = useState('');
    const navigate = useNavigate();

    const [dated, setDated] = useState(null);

   

    function Submit(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/api/holidays',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                occasion: occasion,
                dated: dated
            }
        }).then((res) => {
            toast.error(res.data.message)
            navigate('/holidays');
            console.log(res.data.message)
        }).catch((err) => {
            console.log(err.response.data.errors.dated)
            toast.error(err.response.data.errors.dated[0], {
                position: toast.POSITION.TOP_RIGHT
            });
        })

    }

    function close(id) {
        const items = holiday.filter((item) => item !== id)
        setDesignations(items);
    }

    return (

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop:'40px' }}>
            <div style={{ width: '90%', border: '1px solid grey', padding: '20px' }}>
                <Breadcrumbs style={{ background: '#f7f7f7', padding: '7px 10px', marginBottom: '20px' }} aria-label="breadcrumb">
                    <Link style={{ fontSize: '13px', display: 'flex', alignItems: 'center', color: '#9a8888' }} to="/">
                        <HomeIcon style={{ fontSize: '20px', marginRight: '10px' }} />  Dashboard
                    </Link>
                    <Link
                        style={{ fontSize: '13px', color: '#9a8888' }}
                        to="/holidays"
                    >
                        Holidays
                    </Link>
                </Breadcrumbs>
                <h4>Add Holiday</h4>
                <form onSubmit={Submit}>
                    <div className='row'>
                        <div className='col-12'>
                            <input type="text" placeholder='Holiday' value={occasion} onChange={(e) => { SetOccasion(e.target.value) }} />
                        </div>
                        <div className={'col-12'}>
                        <input type='date' value={dated} onChange={(e) => { setDated(e.target.value)}}/>
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
