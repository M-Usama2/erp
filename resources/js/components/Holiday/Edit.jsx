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

    const [occasion, SetOccasion] = useState('');
    const navigate = useNavigate();

    const [dated, setDated] = useState(null);

    const { id } = useParams();


    const renderHoliday = async () => axios({
        metod: 'get',
        url: `/api/holidays/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    },
    ).then(res => {
        SetOccasion(res.data.holiday.occasion);
        setDated(res.data.holiday.dated_sql);
    }
    ).catch((err) => { console.log(err) });

    useEffect(() => {
        renderHoliday();
    }, []);


    function Submit(e) {
        e.preventDefault();
        axios({
            method: 'put',
            url: `/api/holidays/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                occasion: occasion,
                dated: dated
            }
        }).then((res) => {
            navigate('/holidays');
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })

    }

    function close(id) {
        const items = holiday.filter((item) => item !== id)
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
                        to="/holidays"
                    >
                        Holidays
                    </Link>
                    <span>{occasion}</span>
                </Breadcrumbs>
                <h4>Edit Holiday</h4>
                <form onSubmit={Submit}>
                    <div className='row'>
                        <div className='col-12'>
                            <input required type="text" placeholder='Occasion' value={occasion} onChange={(e) => { SetOccasion(e.target.value) }} />
                        </div>
                        <div className={'col-12'}>
                            <div className={'col-12'}>
                                <input type='date' value={dated} onChange={(e) => { setDated(e.target.value) }} required />
                            </div>
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
