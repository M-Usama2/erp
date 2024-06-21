import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import TableRow from "@mui/material/TableRow";
import DeleteDialog from "../template/dialogs/DeleteDialog";
import { useState } from "react";
import { connect } from "react-redux";
import Loader1 from "../template/loaders/Loader1";

function List({ token, role , permission }) {
    const [loading, setLoading] = useState(true)
    const fecthData = () => {
        axios({
            method: "get",
            url: `/api/payrolls`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(async function (response) {
            console.log(response.data);

            setSalarySlip(response.data.salaryslip);
            setLoading(false)
        });
    };

    const handleDelete = async (id) => {
        setLoading(true)
        await axios.delete('/api/payrolls/' + id, {
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            fecthData()
        }).catch((err) => {
            console.log(err)
        })
        fecthData()
    }

    useEffect(() => {
        fecthData();
    }, []);


    const [salarySlip, setSalarySlip] = useState(fecthData);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteID] = useState(null);

    console.log(deleteId);

    function openDeleteDialog(id, open = true) {
        setDeleteID(id);
        setOpenDelete(open);
    }

    const checkPermission = (name) => role?.includes("super-admin") || permission?.includes(name);

    return (
        <div className="contain-table">
            <div
                style={{
                    marginTop: "30px",
                    fontWeight: "200",
                    fontSize: "18px",
                    color: "white",
                    backgroundColor: "#4b8df8",
                    width: "100%",
                    padding: "7px 15px",
                }}
            >
                <BusinessCenterIcon style={{ fontSize: "20px" }} /> Payrolls
                List
            </div>

            <div
                style={{
                    marginTop: "",
                    border: "1px solid #4b8df8",
                    padding: "10px",
                }}
            >
                {loading ? <Loader1 /> :
                    <TableContainer>
                        <Table
                            sx={{ minWidth: "100%" }}
                            size="small"
                            aria-label="PayHead List"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>NO.</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Earning</TableCell>
                                    <TableCell>Deduction</TableCell>
                                    <TableCell>Total Amount</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {salarySlip
                                    ? salarySlip.map((res, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                {res.employee
                                                    ? res.employee.name
                                                    : null}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className=" text-success px-3 p-1"
                                                    style={{
                                                        borderRadius: "20px",
                                                    }}
                                                >
                                                    {res.earning}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className=" text-danger px-3 p-1"
                                                    style={{
                                                        borderRadius: "20px",
                                                    }}
                                                >
                                                    {res.deduction}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {res.earning - res.deduction}
                                            </TableCell>
                                            <TableCell className="text-left">
                                            {checkPermission("edit payroll") ? (

                                                <Link
                                                    to={`${res.id}`}
                                                    className="button muted-button edit"
                                                    style={{
                                                        marginRight: "10px",
                                                        color: "white",
                                                        background: "#8e44ad",
                                                        padding: "7px 9px",
                                                        textAlign: "center",
                                                        fontSize: "13px",
                                                        fontWeight: "200",
                                                        border: "none",
                                                        borderRadius: "0",
                                                    }}
                                                >
                                                    <EditIcon
                                                        style={{
                                                            color: "white",
                                                            marginBottom: "3px",
                                                            fontSize: "15px",
                                                        }}
                                                    />{" "}
                                                    View
                                                </Link>
                                            ) : null}

                                            {checkPermission("delete payroll") ? (

                                                <button
                                                    onClick={() => openDeleteDialog({ id: res.id })}

                                                    // onClick={() => handleDelete(payhead.id)}
                                                    className="button muted-button delete"
                                                    style={{
                                                        fontWeight: "200",
                                                        color: "white",
                                                        padding: "7px 9px",
                                                        fontSize: "13px",
                                                        border: "none",
                                                        borderRadius: "0",
                                                        background: "#c63927",
                                                    }}
                                                >
                                                    <DeleteIcon
                                                        style={{
                                                            marginBottom: "3px",
                                                            color: "white",
                                                            fontSize: "15px",
                                                        }}
                                                    />{" "}
                                                    Delete
                                                </button>
                                            ) : null}

                                            </TableCell>
                                        </TableRow>
                                    ))
                                    : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }

            </div>
            <DeleteDialog
                title="Delete?"
                content={`Do you wish to delete Payroll ${deleteId ? deleteId.id : null
                    }`}
                titleYes="Delete"
                open={openDelete}
                handleAction={() => {
                    handleDelete(deleteId ? deleteId.id : null);
                    openDeleteDialog(null, false);
                }}
                handleClose={() => {
                    openDeleteDialog(null, false);
                }}
            />
        </div>
    );
}
const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    role: state.role.currentRole,
    permission: state.permission.currentPermission
});

export default connect(mapStateToProps)(List);
