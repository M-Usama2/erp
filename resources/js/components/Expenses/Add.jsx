import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Breadcrumbs } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Add = ({ token }) => {
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [amount, setAmount] = useState(1);

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
    const [expense, setExpense] = useState(null);
    const [description, setDescription] = useState("");

    function Submit(e) {
        e.preventDefault();
        axios({
            method: "post",
            url: "/api/expense",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: {
                name: name,
                description: description,
                amount:amount,
                expense_type_id:expense.id,

            },
        })
            .then((res) => {
                navigate("/expense");
                console.log(res);
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
                        expense
                    </Link>
                </Breadcrumbs>
                <h4>Add Expense</h4>
                <form onSubmit={Submit}>
                    <div className="row">
                        <div className="col-6">
                        <input
                                required
                                type="number"
                                min={1.00}
                                step={0.01}
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-6">
                            <Autocomplete
                                value={expense}
                                onChange={(event, newvalue) => {
                                    setExpense(newvalue);
                                }}
                                disablePortal
                                id="combo-box-demo"
                                options={expenses}
                                sx={{ width: 300}}
                                renderInput={(res) => (
                                    <TextField {...res} />
                                )}
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
    );
};
const mapStateToProps = (state) => ({
    token: state.user.currentUser,
});
export default connect(mapStateToProps)(Add);
