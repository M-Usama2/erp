import HomeIcon from '@mui/icons-material/Home';
import {  Breadcrumbs  } from '@mui/material';
import { Link } from 'react-router-dom'


const Bread = (props) => {
  return (
    <div>
                <Breadcrumbs style={{ background: '#f7f7f7', padding: '7px 10px', marginBottom: '20px' }} aria-label="breadcrumb">
                    <Link style={{ fontSize: '13px', display: 'flex', alignItems: 'center', color: '#9a8888' }} to="/">
                        <HomeIcon style={{ fontSize: '20px', marginRight: '10px' }} />  Dashboard
                    </Link>
                    <span
                        style={{ fontSize: '13px', color: '#9a8888' }}
                        // to="/employees"
                    >
                        {props.name}
                    </span>
                </Breadcrumbs>
    </div>
  )
}

export default Bread
