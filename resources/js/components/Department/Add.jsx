import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useNavigate } from 'react-router-dom';


import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';


const Add = ({ token }) => {

    const [title, SetTitle] = useState('');
    const navigate = useNavigate();

    const [designations, setDesignations] = useState([]);
    const [inputDesignation, seInputDesignation] = useState('');

    function Submit(e) {
        e.preventDefault();
        axios({
            method: 'POST',
            url: '/api/department',
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                title: title,
                designations: designations
            }
        }).then((res) => {
            navigate('/departments');
            // console.log(res + 'Data inserted Successfully')
        }).catch((err) => {
            console.log(err)
        })

    }

    function close(id) {
        const items = designations.filter((item) => item !== id)
        setDesignations(items);
    }

    function designationAdd(title) {
        if (title) {
            const newDesignations = [...designations, title];
            setDesignations(newDesignations);
        }
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
                        to="/departments"
                    >
                        Departments
                    </Link>
                </Breadcrumbs>
                <h4>Add Department</h4>
                <form onSubmit={Submit}>
                    <div className='row'>
                        <div className='col-12'>
                            <input type="text" placeholder='Department' value={title} onChange={(e) => { SetTitle(e.target.value) }} />
                        </div>
                    </div>
                    <div className='row'>
                        <h5 className='mt-4'>Designations</h5>
                        <div className='col-6 ' style={{ display: 'flex', alignItems: 'center', }}>

                            <div className='col-12'>
                                <input type="text" placeholder='Designations' value={inputDesignation} onChange={(e) => { seInputDesignation(e.target.value) }} />
                            </div>
                            <div>

                                <button type='button'
                                    onClick={() => {
                                        designationAdd(inputDesignation);
                                        seInputDesignation('');
                                    }}
                                    className='' style={{ borderRadius: '0px', backgroundColor: '#1caf9a', padding: '10px 20px', border: 'none', marginLeft: '15px', fontWeight: '200' }}><ControlPointIcon style={{ padding: '0px' }} /> </button>
                            </div>
                        </div>
                    </div>
                    <div className='container' style={{ display: 'flex', alignItems: 'center', }}>
                        {designations.map((designation, index) => <div key={index} className=' mt-3'> <span style={{ backgroundColor: 'lightgrey', borderRadius: '30px', padding: '5px 10px', color: 'grey', marginLeft: '10px' }}> {designation} <CloseIcon onClick={() => close(designation)} style={{ marginBottom: '4px', fontSize: '12px', borderRadius: '5px', cursor: 'pointer' }} /> </span>  </div>)}
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
