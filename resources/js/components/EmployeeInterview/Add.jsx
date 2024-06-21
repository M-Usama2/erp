import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import avatar from './avatar1.jpg';

const Add = ({ token }) => {

    // States
    const [photo, SetPicture] = useState(null);
    const [name, SetName] = useState(null);
    const [religion, SetReligion] = useState(null);
    const [gender, SetGender] = useState(null);
    const [age, SetAge] = useState(null);
    const [phone, SetPhone] = useState(null);
    const [email, SetEmail] = useState(null);
    const [nationality, SetNationality] = useState(null);
    const [department_id, setDepartmentID] = useState(null);
    const [designation_id, setDesignationID] = useState(null);

    const navigate = useNavigate();

    // Form Submittion
    async function Submit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("name", name);
        formData.append("religion", religion);
        formData.append("gender", gender);
        formData.append("age", age);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("nationality", nationality);
        formData.append("department_id", department_id);
        formData.append("designation_id", designation_id);
        formData.append("address", 'asasdasd');
        // const token = this.props.token;
        try {
            const response = await axios({
                method: "post",
                url: "/api/employee?hired=0",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            }).then((e) => {
                if (e.data.data.id) {
                    navigate(`/interview/update/${e.data.data.id}`);
                }
            })
        } catch (err) {
            toast.error('required')
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


    const [department, SetDepartment] = useState([]);

    const [imgsrc, setImg] = useState(avatar);

    useEffect(() => {
        async function fetchData() {

            await axios({
                method: 'get',
                url: '/api/departments',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                SetDepartment(response.data.data);
                setDepartmentID(response.data.data[0].id)
            })
        }
        fetchData();
    }, [])



    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '30px' }}>
            <div style={{ width: '90%', border: '1px solid #4b8df8', padding: '0px', }}>
                <div style={{ background: '#4b8df8', height: '60px', color: 'white', display: 'flex', alignItems: 'center', padding: '30px' }}>
                    <h6 className='text-center'>Create Candidate</h6>
                </div>

                <form enctype="multipart/form-data" onSubmit={Submit} style={{ padding: '20px', }} className='sm' >
                    <div className='text-center'>
                        <label for='profilePic'><img src={imgsrc} /></label>
                        <input hidden id='profilePic' type="file" name='photo' style={{ margin: '10px 0px 20px 0px' }} placeholder='Picture' onChange={handleFileSelect} />
                    </div>
                    <label>Name :</label>
                    <input required type="text" name='name' placeholder='Name' value={name} onChange={(e) => { SetName(e.target.value) }} />
                    <div className='row'>
                        <div className='col-6'>
                            <label>Religion :</label>
                            <input required type="text" name='religion' placeholder='Religion' value={religion} onChange={(e) => { SetReligion(e.target.value) }} />
                        </div><div className='col-6'><label>Nationality :</label>
                            <input required name='nationality' type="text" placeholder='Nationality' value={nationality} onChange={(e) => { SetNationality(e.target.value) }} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <label>Gender :</label>
                            <select>
                                <option disabled value={''} >Select Gender</option>
                                <option value={'Male'}>Male</option>
                                <option value={'Female'}>Female</option>
                            </select>
                        </div>
                        <div className='col-6'>
                            <label>Age :</label>
                            <input required type="number" name='age' placeholder='Age' value={age} onChange={(e) => { SetAge(e.target.value) }} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <label>Phone :</label>
                            <input required type="text" name='phone' placeholder='Phone' value={phone} onChange={(e) => { SetPhone(e.target.value) }} />
                        </div>
                        <div className='col-6'>
                            <label>Email :</label>
                            <input required type="email" name='email' placeholder='Email' value={email} onChange={(e) => { SetEmail(e.target.value) }} />
                        </div></div>
                    <div className='row'>

                        <div className='col-6'>
                            <label>Department :</label>
                            <select onChange={(e) => {
                                setDepartmentID(e.target.value);
                            }}>
                                {
                                    department.map((data) => (

                                        <option value={data.id}>{data.title}</option>
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
                                        }).designations.map((data) => (
                                            <option value={data.id}>{data.title}</option>
                                        )) : null
                                }
                            </select>

                        </div>
                    </div>
                    <button type='submit' style={{ backgroundColor: '#1caf9a', border: 'none' }}>Submit</button>
                    <ToastContainer />
                </form>


            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    user: state.user.userData
});

export default connect(mapStateToProps)(Add)
