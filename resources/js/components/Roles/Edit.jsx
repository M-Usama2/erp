import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useNavigate, useParams } from 'react-router-dom';

import { connect } from 'react-redux';


import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'


const Edit = ({ token }) => {

    const [loading, setLoading] = useState(true);
    const { role } = useParams();
    const fetchData = () =>
        axios({
            method: "get",
            url: "/api/permissions",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async function (response) {
                if (await response.data.data) {
                    setRoles(response.data.data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });

            const rol = () => axios({
                method: 'get',
                url: `/api/roles/${role}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(async function (response) {

                    if (await response.data.data) {
                        setName(response.data.data.name);
                        setPermission(response.data.role_permission)
                        setLoading(false);
                    }
                    console.log(response.data)
                }).catch((err) => {
                    alert(role)

                    console.log(err)
                });

                useEffect(() => {
                    rol()
                }, []);

    const [roles, setRoles] = useState(fetchData);

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [permission, setPermission] = useState([]);

    function Submit(e) {
        e.preventDefault();
        axios({
            method: "put",
            url: `/api/roles/${role}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: {
                name: name,
                permissions: permission,
            },
        })
            .then(() => {
                navigate("/roles");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const  handleSelect = (name) => {
       const s = permission.find(
            (per) => per === name
        )
        if(s){
            setPermission(permission.filter((per) => per !== name))

        }else{
            setPermission([...permission, name])
        }
    }

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "40px",
            }}
        >
            <div
                style={{
                    width: "90%",
                    border: "1px solid grey",
                    padding: "20px",
                }}
            >
                <Breadcrumbs
                    style={{
                        background: "#f7f7f7",
                        padding: "7px 10px",
                        marginBottom: "20px",
                    }}
                    aria-label="breadcrumb"
                >
                    <Link
                        style={{
                            fontSize: "13px",
                            display: "flex",
                            alignItems: "center",
                            color: "#9a8888",
                        }}
                        to="/"
                    >
                        <HomeIcon
                            style={{ fontSize: "20px", marginRight: "10px" }}
                        />{" "}
                        Dashboard
                    </Link>
                    <Link
                        style={{ fontSize: "13px", color: "#9a8888" }}
                        to="/roles"
                    >
                        Role
                    </Link>
                </Breadcrumbs>
                <h4>Update Role</h4>
                <form onSubmit={Submit}>
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
                    <div className="row" style={{ marginTop: "30px" }}>
                        <h5>Permissions</h5>
                        {roles.length > 0 ? (
                            <div>
                                <div className="row">
                                    {roles.map((role, i) => (
                                        <div className="col-3">
                                            <input
                                                type="checkbox"
                                                className="permission"
                                                checked={permission.find(
                                                    (per) => per === role.name
                                                )}
                                                onChange={(e) => {
                                                    handleSelect(role.name)
                                                }}
                                            />
                                            <span style={{ padding: "5px" }}>
                                                {role.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <span>No Roles</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="mt-4"
                        style={{
                            borderRadius: "0",
                            backgroundColor: "#1caf9a",
                            border: "none",
                            fontWeight: "200",
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>

    )
}
const mapStateToProps = (state) => ({
    token: state.user.currentUser,
});
export default connect(mapStateToProps)(Edit)
