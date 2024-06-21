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
    const { id } = useParams();

            const expense = () => axios({
                method: 'get',
                url: `/api/expense_type/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(async function (response) {

                    if (await response.data.data) {
                        setName(response.data.data.name);
                        setDescription(response.data.data.description)
                        setLoading(false);
                    }
                    console.log(response.data)
                }).catch((err) => {

                    console.log(err)
                });

    const [expenseType, setExpenseType] = useState(expense);

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    function Submit(e) {
        e.preventDefault();
        axios({
            method: "put",
            url: `/api/expense_type/${id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: {
                name: name,
                description: description,
            },
        })
            .then(() => {
                navigate("/expense_type");
            })
            .catch((err) => {
                console.log(err);
            });
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
                        to="/expense_type"
                    >
                        Expense Type
                    </Link>
                </Breadcrumbs>
                <h4>Update Expense_Type</h4>
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
