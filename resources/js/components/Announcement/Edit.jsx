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
import moment from 'moment/moment';

const Edit = ({ token }) => {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const fetchAnnouncement = () =>
        axios({
            method: 'get',
            url: `/api/announcements/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async function (response) {
                if (await response.data) {
                    setTitle(response.data.announcement.title);
                    setContent(response.data.announcement.content);
                    setDated(moment(response.data.announcement.published_at).format('YYYY-MM-DD'));
                    setLoading(false);
                }
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

    const [announcement, setAnnouncement] = useState(fetchAnnouncement);

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [dated, setDated] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        axios({
            method: 'put',
            url: `/api/announcements/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: {
                title: title,
                content: content,
                dated: dated, 
            },
        })
            .then(() => {
                navigate('/announcements');
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
                    <Link style={{ fontSize: '13px', color: '#9a8888' }} to="/announcements">
                        Announcements
                    </Link>
                </Breadcrumbs>
                <h4>Update Announcement</h4>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12">
                            <input
                                required
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <input
                                required
                                type="text"
                                placeholder="Content"
                                value={content}
                                onChange={(e) => {
                                    setContent(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <input
                                required
                                type="date"
                                placeholder="Dated"
                                value={dated}
                                onChange={(e) => {
                                    setDated(e.target.value);
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
