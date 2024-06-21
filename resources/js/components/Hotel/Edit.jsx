import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const Edit = ({ token }) => {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const fetchHotel = () =>
        axios({
            method: 'get',
            url: `/api/hotels/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async function (response) {
                if (await response.data) {
                    setName(response.data.name);
                    setAddress(response.data.address);
                    setRating(response.data.rating);
                    setLoading(false);
                }
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

    const [hotel, setHotel] = useState(fetchHotel);

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [rating, setRating] = useState(5);

    function handleSubmit(e) {
        e.preventDefault();
        axios({
            method: 'put',
            url: `/api/hotels/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: {
                name: name,
                address: address,
                rating: rating, 
            },
        })
            .then(() => {
                navigate('/hotels');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: '40px',
            }}
        >
            <div
                style={{
                    width: '90%',
                    border: '1px solid grey',
                    padding: '20px',
                }}
            >
                <Breadcrumbs
                    style={{
                        background: '#f7f7f7',
                        padding: '7px 10px',
                        marginBottom: '20px',
                    }}
                    aria-label="breadcrumb"
                >
                    <Link
                        style={{
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#9a8888',
                        }}
                        to="/"
                    >
                        <HomeIcon style={{ fontSize: '20px', marginRight: '10px' }} /> Dashboard
                    </Link>
                    <Link style={{ fontSize: '13px', color: '#9a8888' }} to="/hotels">
                        Hotels
                    </Link>
                </Breadcrumbs>
                <h4>Update Hotel</h4>
                <form onSubmit={handleSubmit}>
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
                                placeholder="Address"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <input
                                required
                                type="number"
                                placeholder="Rating"
                                max={5}
                                min={1}
                                value={rating}
                                onChange={(e) => {
                                    setRating(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-4"
                        style={{
                            borderRadius: '0',
                            backgroundColor: '#1caf9a',
                            border: 'none',
                            fontWeight: '200',
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

export default connect(mapStateToProps)(Edit);
