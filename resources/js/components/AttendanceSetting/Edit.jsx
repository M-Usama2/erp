import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from 'react-redux';

import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'



const Edit = ({ token }) => {

    const [check_in, setCheckIn] = useState(null);
    const [check_out, setCheckOut] = useState(null);
    const navigate = useNavigate();

    const { id } = useParams();


    const renderSetting = async () => axios({
        metod: 'get',
        url: `/api/attendance_settings/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    },
    ).then(res => {
        setCheckIn(res.data.setting.check_in);
        setCheckOut(res.data.setting.check_out);
    }
    ).catch((err) => { console.log(err) });

    useEffect(() => {
        renderSetting();
    }, []);


    function Submit(e) {
        e.preventDefault();
        axios({
            method: 'put',
            url: `/api/attendance_settings/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                check_in: check_in,
                check_out: check_out
            }
        }).then((res) => {
            navigate('/attendance/settings');
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
                        to="/attendance/settings"
                    >
                        Settings
                    </Link>
                </Breadcrumbs>
                <h4>Edit Settings</h4>
                <form onSubmit={Submit}>
                    <div className='row'>
                        <div className='col-6'>
                            <label>Time In :</label>
                            <input required type='time' value={check_in} onChange={(e) => { setCheckIn(e.target.value) }} />
                        </div>
                        <div className='col-6'>
                            <label>Time Out :</label>
                            <input required type='time' value={check_out} onChange={(e) => { setCheckOut(e.target.value) }} />
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
export default connect(mapStateToProps)(Edit)
