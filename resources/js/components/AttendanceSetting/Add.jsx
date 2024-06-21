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
import { useEffect } from 'react';



const Add = ({ token }) => {

    const [department_id, setDepartmentID] = useState(null);
    const [check_in, setCheckIn] = useState(null);
    const [check_out, setCheckOut] = useState(null);

    const [departments, SetDepartments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {

            await axios({
                method: 'get',
                url: '/api/departments',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                SetDepartments(response.data.data);
                setDepartmentID(response.data.data[0].id)
            })
        }
        fetchData();
    }, [])

    function Submit(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/api/attendance_settings',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                department_id: department_id,
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

    function close(id) {
        const items = setting.filter((item) => item !== id)
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
                        to="/attendance/settings"
                    >
                        Settings
                    </Link>
                </Breadcrumbs>
                <h4>Add Setting</h4>
                <form onSubmit={Submit}>
                    <div className='row'>
                        <div className='col-12'>
                            <label>Department :</label>
                            <select onChange={(e) => {
                                setDepartmentID(e.target.value);
                            }}>
                                {
                                    departments.map((data) => (
                                        <option value={data.id}>{data.title}</option>
                                    ))
                                }

                            </select>
                        </div>
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
