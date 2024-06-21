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

    const [title, settitle] = useState("");
    const [description, setDescription] = useState("");

    function Submit(e) {
        e.preventDefault();
        axios({
            method: "post",
            url: "/api/tickets",
            headers: {
                "Description-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: {
                title: title,
                description: description,
            },
        })
            .then((res) => {
                navigate("/tickets");
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
                justifyDescription: "space-between",
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
                        to="/tickets"
                    >
                        Ticket
                    </Link>
                </Breadcrumbs>
                <h4>Add Ticket</h4>
                <form onSubmit={Submit}>
                    <div className="row">
                        <div className="col-12">
                            <input
                                required
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => {
                                    settitle(e.target.value);
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
    );
};
const mapStateToProps = (state) => ({
    token: state.user.currentUser,
});
export default connect(mapStateToProps)(Add);
