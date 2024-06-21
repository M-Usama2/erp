import React from 'react'
import { Link } from 'react-router-dom'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { connect } from "react-redux";
import Bread from '../BreadCrumps/Bread';

function Header({ setIsAdding, setEmployees, employees, role, permission}) {

    const search = async (e) => {
        let key = e.target.value;
        let result = await fetch(`/api/search/${key}`);
        result = await result.json();
        if (result) {
            setEmployees(result)
        }
    }


    const checkPermission = (name) =>
        role?.includes("super-admin") || permission?.includes(name);
    return (
        <header >
            {/* <h1>Employee Management System</h1> */}
            <div style={{display: 'flex' ,alignItems: 'center'}}>

        <p style={{fontWeight: '300', fontSize: '40px', marginRight: '10px'}}>Employees</p>
        <span style={{fontWeight: '100'}}>Employees List</span>
            </div>
           
            <Bread name={'Employee'}/>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                <div >
                    {checkPermission( "add employees" ) ? (

                        <Link style={{ display: 'flex',alignItems: 'center', fontSize: '14px',borderRadius: 'none','background': '#35aa47', 'color': "white", "padding": "8px 20px", 'textDecoration': 'none' }} to={'/employees/add'}> Add New Employee <ControlPointIcon style={{padding: '3px'}} /></Link>
                    ) : null}
                    {/* <button onClick={() => setIsAdding(true)} className='round-button'>Add Button</button> */}
                    {/* <a href='' >ADD</a> */}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', }}>
                    <input type="text" placeholder={ `Search`} style={{ borderRadius: '0', width: '100%',padding: '10px 25px', outline: 'none' }} onChange={search} />
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => ({
    role: state.role.currentRole,
    permission: state.permission.currentPermission,
});

export default connect(mapStateToProps)(Header);

