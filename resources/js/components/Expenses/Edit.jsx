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
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Edit = ({ token }) => {

    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    const expense = () => axios({
        method: 'get',
        url: `/api/expense/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async function (response) {

            if (await response.data.data) {
                setAmount(response?.data?.data?.amount);
                setExpenseType(response?.data?.data?.expenseType?.id);
                setDescription(response?.data?.data?.note)
                setLoading(false);
            }
            console.log("test", response.data)
        }).catch((err) => {

            console.log(err)
        });

    const [expenseType, setExpenseType] = useState(expense);

    const setData = async () => {
        axios({
            method: "get",
            url: `/api/expense_type`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(async function (response) {
            if (await response.data.data) {
                const data = await response.data.data;
                let expense_types = [];
                for (let index = 0; index < data.length; index++) {
                    const etype = data[index];
                    expense_types.push({
                        label: data[index].name,
                        id: data[index].id,
                    })
                }
                setExpenses(expense_types);
            } else {
                setExpenses([]);
            }
        });
    };


    const [expenses, setExpenses] = useState(setData);

    const navigate = useNavigate();

    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");

    function Submit(e) {
        e.preventDefault();
        axios({
            method: "put",
            url: `/api/expense/${id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: {
                amount: amount,
                expense_type_id: expenseType.id,
                note: description,
            },
        })
            .then(() => {
                navigate("/expense");
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
                        to="/expense"
                    >
                        Expense Type
                    </Link>
                </Breadcrumbs>
                <h4>Update expense</h4>
                <form onSubmit={Submit}>
                    <div className="row">
                        <div className="col-6">
                            <input
                                required
                                type="number"
                                min={1}
                                step={0.01}
                                placeholder="Name"
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-6">
                            <Autocomplete
                                value={expenseType}
                                onChange={(event, newvalue) => {
                                    setExpenseType(newvalue);
                                }}
                                disablePortal
                                id="combo-box-demo"
                                options={expenses}
                                sx={{ width: 300 }}
                                renderInput={(res) => (
                                    <TextField {...res} />
                                )}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <input
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
