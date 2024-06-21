import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import JsPDF from 'jspdf';
import { connect } from "react-redux";
import { Breadcrumbs } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Link } from "react-router-dom";

const View = ({ token }) => {
    const { id } = useParams();

    const generatePDF = () => {

        const report = new JsPDF('landscape','pt','a4');
        report.html(document.querySelector('#slip')).then(() => {
            report.save('report.pdf');
        });
    }

    function Valid() {
        axios({
            method: "get",
            url: `/api/payrolls/${id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setSlip(res.data.Payroll);
                console.log(res.data.Payroll);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        Valid();
    }, []);

    const [slip, setSlip] = useState(null);
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
                        Payslip
                    </Link>
                    <span>{name}</span>
                </Breadcrumbs>
                <h4>PAYSLIP</h4>
                <div  id='slip' className="p-3">

                    {slip ? (
                        <table  style={{border: '1.4px solid grey'}} >
                            <thead>
                                <tr>
                                    <th>Employee:</th>
                                    <th>Designation:</th>
                                    <th>EmployeeID:</th>

                                    <th>Pay Period:</th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr>
                                    <td>{slip.employee.name}</td>
                                    <td>{slip.designation?.title}</td>
                                    <td>{slip.employee.id}</td>
                                    <td>{slip.dated}</td>
                                </tr>
                            </tbody>
                            <thead >
                                <tr>
                                    <th>Type: </th>
                                    <th>Earning / deduction</th>    
                                    <th colspan='2'>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slip.salarySlipStructures.length > 0
                                    ? slip.salarySlipStructures.map(
                                          (res, index) => (
                                              <tr>
                                                  <td>{res.name}</td>
                                                  
                                                  <td>
                                                      {res.deduction?'Deduction':'Earning'}
                                                  </td>
                                                  <td colspan={2}>{res.amount}</td>
                                              </tr> 
                                          )
                                      )
                                    : null}
                                    <tr style={{border: '1.4px solid grey'}}>
                                        <th colSpan={2} style={{textAlign: 'start'}}>NetIncome: </th>
                                        <td>{slip.earning-slip.deduction}</td>
                                    </tr>
                            </tbody>
                        </table>
                    ) : null}

                </div>
                <button  className="btn btn-danger bg-danger" style={{border: 'none', padding: '10px 20px', fontSize: '15px'}} onClick={generatePDF} type="button"><PictureAsPdfIcon style={{fontSize: '20px'}}/> Export</button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    token: state.user.currentUser,
});

export default connect(mapStateToProps)(View);
