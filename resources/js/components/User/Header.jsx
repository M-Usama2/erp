import React from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import {  Breadcrumbs  } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

function Header({ setIsAdding, setUsers }) {

  const Temp = async (e) => {
    let key = e.target.value;
    let result = await fetch(`/api/users/${key}`);
    result = await result.json();
    if (result) {
      setUsers(result)
    } else {

    }
}


  return (
    <header >
        <p style={{fontWeight: '300', fontSize: '40px'}}>User</p>
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
                </Breadcrumbs>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

        <div >
        <Link className='' style={{display: 'flex',alignItems: 'center', fontSize: '14px',borderRadius: 'none','background': '#35aa47', 'color': "white", "padding": "7px 20px", 'textDecoration': 'none'}} to={'/users/add'}>Add New User <ControlPointIcon style={{padding: '3px'}} /></Link>
            {/* <button onClick={() => setIsAdding(true)} className='round-button'>Add Button</button> */}
            {/* <a href='' >ADD</a> */}
        </div>
        <div style={{display: 'flex', alignItems: 'center',}}>
         <input type="text" placeholder={`Search`} style={{borderRadius: '0', width: '100%',padding: '10px 25px',width: '100%', outline: 'none'}} onChange={Temp}/>
                        </div>
        </div>
    </header>
  )
}

export default Header
