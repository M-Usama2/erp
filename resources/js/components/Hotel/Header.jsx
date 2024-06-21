import React from 'react'
import { Link } from 'react-router-dom'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { connect } from 'react-redux'

function Header({ setUsers, role, permission }) {

  const Temp = async (e) => {
    let key = e.target.value;
    let result = await fetch(`/api/roles/${key}`);
    result = await result.json();
    if (result) {
      setUsers(result)
    } else {

    }
  }


  return (
    <header >
      <p style={{ fontWeight: '300', fontSize: '40px' }}>Hotels</p>
      <Breadcrumbs style={{ background: '#f7f7f7', padding: '7px 10px', marginBottom: '20px' }} aria-label="breadcrumb">
        <Link style={{ fontSize: '13px', display: 'flex', alignItems: 'center', color: '#9a8888' }} to="/">
          <HomeIcon style={{ fontSize: '20px', marginRight: '10px' }} />  Dashboard
        </Link>
        <Link
          style={{ fontSize: '13px', color: '#9a8888' }}
          to="/hotels"
        >
          Hotels
        </Link>
      </Breadcrumbs>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <div >

          <Link className='' style={{ display: 'flex', alignItems: 'center', fontSize: '14px', borderRadius: 'none', 'background': '#35aa47', 'color': "white", "padding": "7px 20px", 'textDecoration': 'none' }} to={'/hotels/add'}>Add New Hotel <ControlPointIcon style={{ padding: '3px' }} /></Link>
          {/* <button onClick={() => setIsAdding(true)} className='round-button'>Add Button</button> */}
          {/* <a href='' >ADD</a> */}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', }}>
          <input type="text" placeholder={`Search hotels`} style={{ borderRadius: '0', width: '100%', padding: '10px 25px', width: '100%', outline: 'none' }} onChange={Temp} />
        </div>
      </div>
    </header>
  )
}

const mapStateToProps = (state) => ({
  role: state.role.currentRole,
  permission: state.permission.currentPermission,
});

export default connect(mapStateToProps)(Header)
