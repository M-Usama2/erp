import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useNavigate, useParams } from 'react-router-dom';

import { connect } from 'react-redux';


import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'


const Edit = ({ token }) => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role_name, setRoleName] = useState(null);

    const [roles, setRoles] = useState([]);

    const navigate = useNavigate();

    const [user, setUser] = useState();

    const { usernameParm } = useParams();


    const renderUser = async () => axios({
        metod: 'get',
        url: `/api/user/${usernameParm}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    },
    ).then(res => {
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setUsername(res.data.user.username);
        setRoleName(res.data.user.roles[0]);
    }
    ).catch((err) => { console.log(err) });

    useEffect(() => {
        axios({
            method: 'get',
            url: '/api/roles',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async function (response) {
                if (await response.data.roles) {
                    setRoles(response.data.roles)
                    setLoading(false);
                }
            }).catch((err) => {
                console.log(err)
            });

        renderUser();
    }, []);


    function Submit(e) {
        e.preventDefault();
        axios({
            method: 'put',
            url: `/api/user/${username}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                name: name,
                username: username,
                email: email,
                password: password ? password : null,
                role_name: role_name
            }
        }).then((res) => {
            navigate('/users');
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })

    }

    return (

        <div style={{ display: 'flex', justifyContent: 'space-between', wusernameth: '100%', marginTop: '40px' }}>
            <div style={{ width: '90%', border: '1px solid grey', padding: '20px' }}>
                <Breadcrumbs style={{ background: '#f7f7f7', padding: '7px 10px', marginBottom: '20px' }} aria-label="breadcrumb">
                    <Link style={{ fontSize: '13px', display: 'flex', alignItems: 'center', color: '#9a8888' }} to="/">
                        <HomeIcon style={{ fontSize: '20px', marginRight: '10px' }} />  Dashboard
                    </Link>
                    <Link
                        style={{ fontSize: '13px', color: '#9a8888' }}
                        to="/users"
                    >
                        Users
                    </Link>
                    <span>{username}</span>
                </Breadcrumbs>
                <h4>Edit User</h4>
                <form onSubmit={Submit}>
                    <div className='row'>
                        <div className='col-12'>
                            <input required type="text" placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <div className='col-6'>
                            <input required type="text" placeholder='Username' value={username} onChange={(e) => { setUsername(e.target.value) }} />
                        </div>
                        <div className='col-6'>
                            <input required type="email" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className='col-6'>
                            <input type="password" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className='col-6'>
                            <select value={role_name} onChange={(e) => {
                                setRoleName(e.target.value);
                            }}>
                                {
                                    roles.map((role) => (
                                        <option value={role.name}>{role.name}</option>
                                    ))
                                }

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
export default connect(mapStateToProps)(Edit)
