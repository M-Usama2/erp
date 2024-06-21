import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TableRow from "@mui/material/TableRow";
import avatar from "./avatar1.jpg";
import DescriptionIcon from "@mui/icons-material/Description";
import { CSVLink } from "react-csv";
import { Avatar, Box } from "@mui/material";
import DeleteDialog from "../template/dialogs/DeleteDialog";
import { connect } from "react-redux";

function List({
    employees,
    handleEdit,
    handleDelete,
    pagination,
    role,
    permission,
    machineData
}) {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: null,
    });

    // const params = useParams();
    const headers = [
        { label: "Name", key: "name" },
        { label: "Religion", key: "religion" },
        { label: "Phone", key: "phone" },
        { label: "Email", key: "email" },
        { label: "Gender", key: "gender" },
        { label: "Age", key: "age" },
        { label: "Nationality", key: "nationality" },
    ];

    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteID] = useState(null);

    function openDeleteDialog(id, open = true) {
        setDeleteID(id);
        setOpenDelete(open);
    }

    const checkPermission = (name) =>
        role?.includes("super-admin") || permission?.includes(name);
    return (
        <div className="contain-table">
            <div
                style={{
                    marginTop: "30px",
                    fontWeight: "200",
                    fontSize: "18px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#1caf9a",
                    width: "100%",
                    padding: "7px 15px",
                }}
            >
                <div>
                    <PeopleAltIcon style={{ fontSize: "22px" }} /> Employees
                    List
                </div>
                <div className="d-flex">
                <div className="m-1">
                    <button 
                        style={{
                            border: "none",
                            borderRadius: "0",
                            display: "flex",
                            alignItems: "center",
                            background: "#35AA48",
                            color: "white",
                            fontWeight: "200",
                        }}
                    onClick={machineData}>Update List</button>
                </div>
                    <CSVLink data={employees} headers={headers}>
                        <button
                            className="m-1"
                            style={{
                                border: "none",
                                borderRadius: "0",
                                display: "flex",
                                alignItems: "center",
                                padding: "4px 13px",
                                background: "#ffaa24",
                                color: "white",
                                fontWeight: "200",
                            }}
                        >
                            {" "}
                            <DescriptionIcon
                                style={{ padding: "5px", fontSize: "30px" }}
                            />{" "}
                            Export
                        </button>
                    </CSVLink>
                </div>
            </div>
            <div
                style={{
                    marginTop: "",
                    border: "1px solid #1caf9a",
                    padding: "10px",
                }}
            >
                <TableContainer>
                    <Table
                        sx={{ maxWidth: "100%" }}
                        size="small"
                        aria-label="Employee Table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>EmployeeID.</TableCell>
                                <TableCell align="">PROFILE</TableCell>
                                <TableCell align="">NAME</TableCell>
                                <TableCell align="right">DESIGNATION</TableCell>
                                <TableCell align="right">
                                    QUALIFICATION
                                </TableCell>
                                <TableCell align="right">EXPERIENCE</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.length > 0 ? (
                                employees.map((employee, i) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>{i + 1}</TableCell>

                                        <TableCell
                                            className="photo"
                                            style={{
                                                background: "",
                                                borderRadius: "5px",
                                                height: "40px",
                                                width: "",
                                            }}
                                        >
                                            {employee.photo ? (
                                                <Avatar
                                                    src={employee.photo}
                                                    alt="photo"
                                                />
                                            ) : (
                                                <Avatar
                                                    src={avatar}
                                                    alt="default"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {employee.name}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {employee.designation
                                                ? employee.designation.title
                                                : null}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {employee.latest_education
                                                ? employee.latest_education
                                                    .certification
                                                : "-"}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {employee.YearExperience
                                                ? employee.YearExperience +
                                                " years"
                                                : "-"}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Box sx={{ display: "flex" }}>
                                                {checkPermission(
                                                    "edit employees"
                                                ) ? (
                                                    <Link
                                                        to={`/employees/update/${employee.id}`}
                                                        className="button muted-button edit"
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            marginRight: "10px",
                                                            color: "white",
                                                            background:
                                                                "#8e44ad",
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
                                                                marginBottom:
                                                                    "3px",
                                                                color: "white",
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                        />{" "}
                                                        Edit/View
                                                    </Link>
                                                ) : null}
                                                {checkPermission(
                                                    "delete employees"
                                                ) ? (
                                                    <button
                                                        // onClick={() => handleDelete(employee.id)}
                                                        onClick={() =>
                                                            openDeleteDialog({
                                                                id: employee.id,
                                                                name: employee.name,
                                                            })
                                                        }
                                                        className="button muted-button delete"
                                                        style={{
                                                            fontWeight: "200",
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            color: "white",
                                                            padding: "7px 9px",
                                                            fontSize: "13px",
                                                            border: "none",
                                                            borderRadius: "0",
                                                            background:
                                                                "#c63927",
                                                        }}
                                                    >
                                                        <DeleteIcon
                                                            style={{
                                                                marginBottom:
                                                                    "3px",
                                                                color: "white",
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                        />{" "}
                                                        Delete
                                                    </button>
                                                ) : null}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <tr>
                                    <TableCell colSpan={7}>
                                        No Employees
                                    </TableCell>
                                </tr>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div>
                    {
                        pagination
                    }
                </div>
            </div>
            <DeleteDialog
                title="Delete?"
                content={`Do you wish to delete Employee ${deleteId ? deleteId.name : null
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
    role: state.role.currentRole,
    permission: state.permission.currentPermission,
});
export default connect(mapStateToProps)(List);
