import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Breadcrumbs } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const Add = ({ token }) => {
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zip, setZip] = useState("");


    function Submit(e) {
        e.preventDefault();
        axios({
            method: "post",
            url: "/api/customers",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: {
                name: name,
                email: email,
                phone: phone,
                address: address,
                city: city,
                state: state,
                country: country,
                zip: zip,
            },
        })
            .then((res) => {
                navigate("/customers");
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
                        to="/customers"
                    >
                        Customer
                    </Link>
                </Breadcrumbs>
                <h4>Add Customer</h4>
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
                        <div className="col-6">
                            <input
                                required
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-6">
                            <input
                                required
                                type="number"
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <textarea
                                required
                                placeholder="Address"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                }}
                            ></textarea>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <input
                                required
                                type="text"
                                placeholder="Country"
                                value={country}
                                onChange={(e) => {
                                    setCountry(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-6">
                            <input
                                required
                                type="number"
                                placeholder="Zip"
                                value={zip}
                                onChange={(e) => {
                                    setZip(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <input
                                required
                                type="text"
                                placeholder="State"
                                value={state}
                                onChange={(e) => {
                                    setState(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-6">
                            <input
                                required
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value);
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
