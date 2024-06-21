import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Box, Breadcrumbs, Tab, Tabs, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Education from './Education';
import Experience from './Experience';
import Documents from './Documents';
import './style/edit.scss';
import { connect } from 'react-redux';
import BankAccount from './BankAccount';
import Salary from './Salary';
import Loader1 from '../template/loaders/Loader1';

function Edit({ token }) {

    const [data, setData] = useState([]);
    const [photo, SetPicture] = useState(null);

    const [department, SetDepartment] = useState([]);
    const [department_id, setDepartmentID] = useState(null);
    const [designation_id, setDesignationID] = useState(null);
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    const { id } = useParams();

    async function fetchDepartment(department_id, designationId) {
        if(!department_id || !designation_id) return console.log('No department id')
        await axios({
            method: 'get',
            url: '/api/departments',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            SetDepartment(response.data.data);
            setDepartmentID(department_id)
            setDesignationID(designationId)
        })
    }

    const renderEmployee = async () => axios({
        metod: 'get',
        url: `/api/employee/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    },
    ).then(res => {
        setData(res.data.data);
        setImg(res.data.data.photo);
        fetchDepartment(res?.data?.data?.designation?.department_id, res?.data?.data?.designation?.id);
        setLoading(false);
    }
    ).catch((err) => { console.log(err) });


    useEffect(() => {
        // axios.get(`/api/employee/${id}`).then(res => setData(res.data.data)).catch((err) => { console.log(err) });
        renderEmployee();
    }, []);

    const [imgsrc, setImg] = useState(null);


    function handleSubmit(e) {
        axios.put(`/api/employee/${id}`, data).then(() => { navigate(-1) }).catch((err) => { console.log(err) });

    }

    // for picture method
    async function Submit(e) {
        e.preventDefault();
        const formData = new FormData();
        if (photo) {
            formData.append("photo", photo);
        }
        formData.append('_method', 'put');
        formData.append("name", data?.name);
        formData.append("religion", data?.religion);
        formData.append("gender", data?.gender);
        formData.append("age", data?.age);
        formData.append("phone", data?.phone);
        formData.append("email", data?.email);
        formData.append("nationality", data?.nationality);
        formData.append("department_id", department_id || '');
        formData.append("designation_id", designation_id ||'');
        formData.append("address", '-');
        // const token = this.props.token;
        try {
            const response = await axios({
                method: "post",
                url: `/api/employee/${id}`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            }).then((e) => {
                if (e.data.data.id) {
                    navigate(-1);
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    const handleFileSelect = (event) => {
        SetPicture(event.target.files[0]);
        var reader = new FileReader();
        var url = reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = function (e) {
            setImg([reader.result]);
        }
    }

    // Tabs
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };


    return ( loading ? <Loader1 /> :
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '30px' }}>
            <Box sx={{ width: 1 }}>
                <Breadcrumbs style={{ background: '#f7f7f7', padding: '7px 10px' }} aria-label="breadcrumb">
                    <Link style={{ fontSize: '13px', display: 'flex', alignItems: 'center', color: '#9a8888' }} to="/">
                        <HomeIcon style={{ fontSize: '20px', marginRight: '10px' }} />  Dashboard
                    </Link>
                    <Link
                        style={{ fontSize: '13px', color: '#9a8888' }}
                        to="/employees"
                    >
                        Employees
                    </Link>
                    <Typography style={{ fontSize: '13px', color: '#9a8888' }}>{data.name}</Typography>
                </Breadcrumbs>
                <br />
                <Box>
                    <Tabs TabIndicatorProps={{
                        style: {
                            backgroundColor: "#4b8df8",
                        }
                    }}
                        value={tabIndex} onChange={handleTabChange}>
                        <Tab className='tab-style' label="Profile" />
                        <Tab className='tab-style' label="Education" />
                        <Tab className='tab-style' label="Experience" />
                        <Tab className='tab-style' label="Document" />
                        <Tab className='tab-style' label="Bank Account" />
                        <Tab className='tab-style' label="Salary History" />
                    </Tabs>
                </Box>
                <Box sx={{ padding: 2 }}>
                    {tabIndex === 0 && (
                        <Box>
                            <div style={{ width: '90%', border: '1px solid #4b8df8', padding: '0px', }}>
                                <div style={{ background: '#4b8df8', height: '60px', color: 'white', display: 'flex', alignItems: 'center', padding: '30px' }}>
                                    <h6 className='text-center'>UPDATE EMPLOYEE</h6>
                                </div>
                                <form onSubmit={Submit} style={{ padding: '20px', }} className='sm'>
                                    <img src={imgsrc} />
                                    <label>Profile :</label>
                                    <input type="file" name='photo' style={{ margin: '10px 0px 20px 0px' }} placeholder='Picture' onChange={handleFileSelect} />
                                    <label>Name :</label>
                                    <input type="text" name='name' onChange={e => setData({ ...data, name: e.target.value })} placeholder='Name' value={data.name} />
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label>Religion :</label>
                                            <input type="text" name='religion' onChange={e => setData({ ...data, religion: e.target.value })} placeholder='Religion' value={data.religion} />
                                        </div>
                                        <div className='col-6'>
                                            <label>Nationality :</label>
                                            <input type="text" name='nationality' onChange={e => setData({ ...data, nationality: e.target.value })} placeholder='Nationality' value={data.nationality} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label>Gender :</label>
                                            <select value={data.gender} onChange={e => setData({ ...data, gender: e.target.value })}>
                                                <option value={'Male'}>Male</option>
                                                <option value={'Female'}>Female</option>
                                            </select>
                                        </div>
                                        <div className='col-6'>
                                            <label>Age :</label>
                                            <input type="text" name='age' onChange={e => setData({ ...data, age: e.target.value })} placeholder='Age' value={data.age} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label>Phone :</label>
                                            <input type="text" name='phone' onChange={e => setData({ ...data, phone: e.target.value })} placeholder='Phone' value={data.phone} />
                                        </div>
                                        <div className='col-6'>
                                            <label>Email :</label>
                                            <input type="text" name='email' onChange={e => setData({ ...data, email: e.target.value })} placeholder='Email' value={data.email} />
                                        </div>
                                    </div>
                                    <div className='row'>

                                        <div className='col-6'>
                                            <label>Department :</label>
                                            <select onChange={(e) => {
                                                setDepartmentID(e.target.value);
                                                setDesignationID(null);
                                            }}>
                                                {
                                                    department.map((dept) => (

                                                        <option selected={department_id == dept.id} value={dept.id}>{dept.title}</option>
                                                    ))
                                                }

                                            </select>
                                        </div>
                                        <div className='col-6'>
                                            <label>Designation :</label>
                                            <select required onChange={(e) => { setDesignationID(e.target.value) }}>
                                                <option value="" disabled selected>Select Designation</option>
                                                {
                                                    department_id ?
                                                        department.find(depart => {
                                                            return depart.id == department_id
                                                        }).designations.map((des, index) => {
                                                            if (!designation_id && index == 0) {
                                                                setDesignationID(des.id);
                                                            }
                                                            return <option
                                                                selected={(data.designation.id == des.id) || (index == 0 && !designation_id)}
                                                                value={des.id}>{des.title}</option>
                                                        }) : null
                                                }
                                            </select>

                                        </div>
                                    </div>
                                    <button type='submit' style={{ backgroundColor: '#4b8df8', border: 'none' }}>Submit</button>
                                </form>
                            </div>
                        </Box>
                    )}
                    {tabIndex === 1 && (
                        <Box>
                            <Education reRender={renderEmployee} employeeId={data.id} listing={data.education} />
                        </Box>
                    )}
                    {tabIndex === 2 && (
                        <Box>
                            <Experience reRender={renderEmployee} employeeId={data.id} listing={data.experience} />
                        </Box>
                    )}
                    {tabIndex === 3 && (
                        <Box>
                            <Documents reRender={renderEmployee} employeeId={data.id} listing={data.document} />
                        </Box>
                    )}
                    {tabIndex === 4 && (
                        <Box>
                            <BankAccount employeeId={data.id} bank={data.bank_account} />
                        </Box>
                    )}
                    {tabIndex === 5 && (
                        <Box>
                            <Salary reRender={renderEmployee} employeeId={data.id} listing={data.salaries} />

                        </Box>
                    )}
                </Box>
            </Box>


        </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    user: state.user.userData
});
export default connect(mapStateToProps)(Edit)
