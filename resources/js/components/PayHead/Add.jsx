import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';

import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'



const Add = ({ token }) => {

    const [name, setName] = useState('');
    const navigate = useNavigate();

    const [deduction, setDeduction] = useState(0);

    function Submit(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/api/payheads',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                name: name,
                deduction: deduction
            }
        }).then((res) => {
            navigate('/payheads');
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })

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
                        to="/payheads"
                    >
                        PayHeads
                    </Link>
                </Breadcrumbs>
                <h4>Add PayHead</h4>
                <form onSubmit={Submit}>
                    <div className='row'>
                        <div className='col-12'>
                            <input required type="text" placeholder='PayHead' value={name} onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <div className={'col-12'}>
                            <select value={deduction} onChange={(e) => { setDeduction(e.target.value) }}>
                                <option value={0}>Earning</option>
                                <option value={1}>Deduction</option>
                            </select>
                        </div>
                    </div>
                    <button type='submit' className='mt-4' style={{ borderRadius: '0', backgroundColor: '#1caf9a', border: 'none', fontWeight: '200' }}>Submit</button>
                </form>
            </div>
        </div>


    )
}
const mapStateToProps = (state) => ({
    token: state.user.currentUser,
});
export default connect(mapStateToProps)(Add)
