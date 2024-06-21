import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const Edit = ({ token }) => {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const fetchTeam = () =>
        axios({
            method: 'get',
            url: `/api/teams/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async function (response) {
                if (await response.data) {
                    setName(response.data.team.title);
                    setDescription(response.data.team.description);
                    setMembers(response.data.team.members);
                    setLoading(false);
                }
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

    const [team, setTeam] = useState(fetchTeam);

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [members, setMembers] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        axios({
            method: 'put',
            url: `/api/teams/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: {
                title: name,
                description: description,
            },
        })
            .then(() => {
                navigate('/teams');
            })
            .catch((err) => {
                console.log(err);
            });
    }


    const fecthEmployees = async () => {
        await axios({
            method: 'get',
            url: '/api/employees',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async function (response) {
                if (await response.data) {
                    setEmployees(response?.data?.data || []);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        fecthEmployees();
    }, []);

    const addMember = async (e) => {
        e.preventDefault();
        await axios({
            method: 'post',
            url: `/api/teams/${id}/addMember`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: {
                employee_id: selectedEmployee,
            },
        })
            .then(() => {
                setSelectedEmployee(null)
                fetchTeam();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const removeMember = async (employee_id) => {
        await axios({
            method: 'delete',
            url: `/api/teams/${id}/removeMember/${employee_id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                fetchTeam();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                width: '100%',
                marginTop: '40px',
            }}
        >
            <div
                style={{
                    width: '90%',
                    border: '1px solid grey',
                    padding: '20px',
                }}
            >
                <Breadcrumbs
                    style={{
                        background: '#f7f7f7',
                        padding: '7px 10px',
                        marginBottom: '20px',
                    }}
                    aria-label="breadcrumb"
                >
                    <Link
                        style={{
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#9a8888',
                        }}
                        to="/"
                    >
                        <HomeIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Dashboard
                    </Link>
                    <Link style={{ fontSize: '13px', color: '#9a8888' }} to="/teams">
                        Teams
                    </Link>
                </Breadcrumbs>
                <h4>Update Team</h4>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12">
                            <input
                                required
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <input
                                required
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-4"
                        style={{
                            borderRadius: '0',
                            backgroundColor: '#1caf9a',
                            border: 'none',
                            fontWeight: '200',
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
            <div
                style={{
                    width: '90%',
                    border: '1px solid grey',
                    padding: '20px',
                }}
            >
                <form onSubmit={addMember}>
                    <div className="row">
                        <div className="col-10">
                            <select
                                value={selectedEmployee}
                                onChange={(e) => setSelectedEmployee(e.target.value)}
                            >
                                <option selected={!selectedEmployee} value={null}>Select Employee</option>
                                {employees.map((employee) => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-2">
                            <button type='submit' style={{ borderRadius: '0', backgroundColor: '#1caf9a', border: 'none', fontWeight: '200' }}>
                                Add
                            </button>
                        </div>
                    </div>
                </form>

                <div>
                    <h4>Members</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members?.map((member) => (
                                <tr key={member.id}>
                                    <td>{member.employee.name}</td>
                                    <td>
                                        <button
                                            onClick={() => removeMember(member.employee.id)}
                                            style={{ borderRadius: '0', backgroundColor: '#c63927', border: 'none', fontWeight: '200' }}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    token: state.user.currentUser,
});

export default connect(mapStateToProps)(Edit);
