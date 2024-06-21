import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

function Header({ dateChange, currentDate }) {

    return (
        <header >
            <p style={{ fontWeight: '300', fontSize: '40px' }}>Attendance</p>
            <Breadcrumbs style={{ background: '#f7f7f7', padding: '7px 10px', marginBottom: '20px' }} aria-label="breadcrumb">
                <Link style={{ fontSize: '13px', display: 'flex', alignItems: 'center', color: '#9a8888' }} to="/">
                    <HomeIcon style={{ fontSize: '20px', marginRight: '10px' }} />  Dashboard
                </Link>
                <Link
                    style={{ fontSize: '13px', color: '#9a8888' }}
                    to="/attendance"
                >
                    Attendance
                </Link>
            </Breadcrumbs>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', }}>
                    <input value={currentDate} onInput={(e) => dateChange(e)} type="date" placeholder={`Date`} style={{ borderRadius: '0', width: '100%', padding: '10px 25px', width: '100%', outline: 'none' }} />
                </div>
            </div>
        </header>
    )
}

export default Header
