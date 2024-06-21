import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Bread from '../BreadCrumps/Bread';
import {connect} from 'react-redux'

function Header({ setEmployees, role, permission }) {

    const search = async (e) => {
        let key = e.target.value;
        let result = await fetch(`/api/search/${key}`);
        result = await result.json();
        if (result) {
            setEmployees(result)
        }
    }

    const checkPermission = (name) => role?.includes("super-admin") || permission?.includes(name);

    return (
        <header >
            <div style={{display: 'flex' ,alignItems: 'center'}}>

        <p style={{fontWeight: '300', fontSize: '40px', marginRight: '10px'}}>Interview</p>
        <span style={{fontWeight: '100'}}>Candidate List</span>
            </div>

            <Bread name={'Interview'}/>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                <div >
                    {checkPermission("add interview") ? (
                        <Link className='' style={{ display: 'flex',alignItems: 'center', fontSize: '14px',borderRadius: 'none','background': '#35aa47', 'color': "white", "padding": "8px 20px", 'textDecoration': 'none' }} to={'/interview/add'}> Add New Candidate <ControlPointIcon style={{padding: '3px'}} /></Link>
                    ) : null}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', }}>
                    <input type="text" placeholder={ `Search`} style={{ borderRadius: '0', width: '100%',padding: '10px 25px', outline: 'none' }} onChange={search} />
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    role: state.role.currentRole,
    permission: state.permission.currentPermission 
});

export default connect(mapStateToProps)(Header);

