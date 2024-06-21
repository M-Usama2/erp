import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';

import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'



const Add = ({ token }) => {

    const [name, SetName] = useState('');
    const [identity, SetIdentity] = useState('');
    const [cost, SetCost] = useState(0);
    const navigate = useNavigate();

    const [document, setDocument] = useState(null);

    function Submit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        if (document) {
            formData.append("document", document);
        }
        formData.append("identity", identity);
        formData.append("cost", cost);
        axios({
            method: 'post',
            url: '/api/assets',
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            },
            data: formData
        }).then((res) => {
            navigate('/assets');
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })

    }

    const handleFileSelect = (event) => {
        setDocument(event.target.files[0]);
        var reader = new FileReader();
        var url = reader.readAsDataURL(event.target.files[0]);
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
                        to="/assets"
                    >
                        Assets
                    </Link>
                </Breadcrumbs>
                <h4>Add Asset</h4>
                <form onSubmit={Submit}>
                    <div className='row'>
                        <div className='col-6'>
                            <label>Name</label>
                            <input required type="text" placeholder='Asset' value={name} onChange={(e) => { SetName(e.target.value) }} />
                        </div>
                        <div className='col-6'>
                            <label>Identity</label>
                            <input required type="text" placeholder='Asset' value={identity} onChange={(e) => { SetIdentity(e.target.value) }} />
                        </div>
                        <div className='col-6'>
                            <label>Cost</label>
                            <input required type="number" placeholder='Asset' value={cost} onChange={(e) => { SetCost(e.target.value) }} />
                        </div>
                        <div className={'col-6'}>
                            <label>Document</label>
                            <input type='file' name={"document"} onChange={handleFileSelect} />
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
export default connect(mapStateToProps)(Add)
