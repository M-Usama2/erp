import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from 'react-redux';

import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'



const Add = ({ token }) => {

    const [title, SetTitle] = useState('');
    const navigate = useNavigate();

    const [template, setTemplate] = useState('<p>Hello,</p>');

    function Submit(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/api/templates',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                title: title,
                template: template
            }
        }).then((res) => {
            navigate('/templates');
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })

    }

    function close(id) {
        const items = template.filter((item) => item !== id)
        setDesignations(items);
    }

    return (

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop:'40px' }}>
            <div style={{ width: '90%', border: '1px solid grey', padding: '20px' }}>
                <Breadcrumbs style={{ background: '#f7f7f7', padding: '7px 10px', marginBottom: '20px' }} aria-label="breadcrumb">
                    <Link style={{ fontSize: '13px', display: 'flex', alignItems: 'center', color: '#9a8888' }} to="/">
                        <HomeIcon style={{ fontSize: '20px', marginRight: '10px' }} />  Dashboard
                    </Link>
                    <Link
                        style={{ fontSize: '13px', color: '#9a8888' }}
                        to="/templates"
                    >
                        Email Templates
                    </Link>
                </Breadcrumbs>
                <h4>Add Template</h4>
                <form onSubmit={Submit}>
                    <div className='row'>
                        <div className='col-12'>
                            <input required type="text" placeholder='Template' value={title} onChange={(e) => { SetTitle(e.target.value) }} />
                        </div>
                        <div className={'col-12'}>
                            <CKEditor required
                                editor={ClassicEditor}
                                data={template}
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Hello, ', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setTemplate(data);
                                    // console.log( { event, editor, data } );
                                }}
                                onBlur={(event, editor) => {
                                    // console.log( 'Blur.', editor );
                                }}
                                onFocus={(event, editor) => {
                                    // console.log( 'Focus.', editor );
                                }}
                            />
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
