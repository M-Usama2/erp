import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Breadcrumbs, Chip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Add = ({ token }) => {


    const payhead = () =>
        axios({
            method: "get",
            url: "/api/payheads",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async function (response) {
                if (await response.data.payheads) {
                    const data = response.data.payheads;
                    var payhea = [];
                    for (let index = 0; index < data.length; index++) {
                        payhea[index] = {
                            id: data[index].id,
                            name: data[index].name,
                            deduction: data[index].deduction,
                            amount: 0,
                        };
                    }
                    setPayHeads(payhea);
                }
            })
            .catch((err) => {
                console.log(err);
            });

    const [payheads, setPayHeads] = useState(payhead);

    const postData = async () => {
        await axios({
            method: "post",
            url: `/api/payrolls`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                employee_id: employeeId.id,
                payheads: payheads,
            },
        }).then(async function (response) {
            console.log(response);
        });
    };

    const fecthData = () => {
        axios({
            method: "get",
            url: `/api/employees?all=1`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(async function (response) {
            if (await response.data.data) {
                console.log("ASd", response.data.data);
                const data = response.data.data;
                var employeeData = [];
                for (let index = 0; index < data.length; index++) {
                    employeeData[index] = {
                        label: data[index].name,
                        id: data[index].id,
                        salaray: data[index]?.current_salary ?? 0,
                    };
                }
                setEmployees(employeeData);
            }
        });
    };

    const [employees, setEmployees] = useState(fecthData);
    const [employeeId, setEmployeeId] = useState(null);
    console.log(employeeId)
    const [payheadId, setPayheadId] = useState(null);
    const [salary, setSalary] = useState("");
    const navigate = useNavigate();

    const [deduction, setDeduction] = useState(0);


    function Submit() {
        // e.preventDefault();
        postData();
        navigate('/payrolls');

    }

    const hangleAmount = (i, amount) => {
        let newArr = [];

        for (let index = 0; index < payheads.length; index++) {
            newArr[index] = payheads[index];
        }
        newArr[i].amount = amount;
        setPayHeads(newArr);
    };

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
                        to="/payheads"
                    >
                        Payroll
                    </Link>
                </Breadcrumbs>
                <h4>Add Payroll</h4>
                <form className="d-flex align-items-center">
                    <div className="row ">
                        <div className="col-6">

                            <Autocomplete
                                value={employeeId}
                                onChange={(event, newvalue) => {
                                    setEmployeeId(newvalue);
                                    console.log("sss", {
                                        id: null,
                                        name: "Salary",
                                        deduction: 0,
                                        amount: parseFloat(newvalue.salaray.basic),
                                    });
                                    if (payheads[0]?.name === 'Salary') {
                                        payheads[0] = {
                                            id: null,
                                            name: "Salary",
                                            deduction: 0,
                                            amount: parseFloat(newvalue.salaray.basic),
                                        };
                                    } else {
                                        setPayHeads([{
                                            id: null,
                                            name: "Salary",
                                            deduction: 0,
                                            amount: parseFloat(newvalue.salaray.basic),
                                        }, ...payheads]);
                                    }
                                }}
                                disablePortal
                                id="combo-box-demo"
                                options={employees}
                                sx={{ width: 300 }}
                                renderInput={(employee) => (
                                    <TextField {...employee} />
                                )}
                            />
                        </div>
                        <div className="col-6">


                            <input type="date" style={{ padding: '19px' }} />
                        </div>
                        <h5>Payheads:</h5>
                        <div className=" d-flex">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID:</th>
                                        <th>Payheads:</th>
                                        <th>Type:</th>
                                        <th>Amount:</th>
                                    </tr>
                                </thead>
                                {payheads.length > 0 ? (
                                    payheads.map((res, index) => (
                                        <tbody>
                                            <td>{res.id}</td>
                                            <td>{res.name}</td>
                                            <td>
                                                {res.deduction ? (
                                                    <Chip
                                                        size="small"
                                                        className="error bg-danger text-white"
                                                        label={"Deduction"}
                                                    />
                                                ) : (
                                                    <Chip
                                                        size="small"
                                                        className="success bg-success text-white"
                                                        label={"Earning"}
                                                    />
                                                )}
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={res.amount}
                                                    readOnly={res.name === 'Salary'}
                                                    style={{
                                                        outline: "none",
                                                        border: "1px solid grey",
                                                        width: "50%",
                                                    }}
                                                    onChange={(e) => {
                                                        hangleAmount(
                                                            index,
                                                            e.target.value
                                                        );
                                                    }}
                                                    defaultValue={0}
                                                    placeholder="Amount"
                                                />
                                            </td>
                                        </tbody>
                                    ))
                                ) : (
                                    <span>No</span>
                                )}
                                <button
                                    type="submit"
                                    className="mt-5"
                                    onClick={() => Submit()}
                                    style={{
                                        background: "#1caf9a",
                                        padding: "1vw 4vw ",
                                    }}
                                >
                                    Submit
                                </button>
                            </table>
                        </div>
                    </div>
                    <div></div>
                </form>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => ({
    token: state.user.currentUser,
});
export default connect(mapStateToProps)(Add);
