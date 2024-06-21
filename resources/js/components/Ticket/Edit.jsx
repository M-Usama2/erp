import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { Send as SendIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

const Edit = ({ token }) => {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const fetchTicket = () =>
        axios({
            method: 'get',
            url: `/api/tickets/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async function (response) {
                if (await response.data) {
                    setTitle(response.data.tickets.title);
                    setDescription(response.data.tickets.description);
                    setStatus(response.data.tickets.status);
                    setLoading(false);
                    if (response.data?.tickets?.comments) {
                        setComments(response.data.tickets.comments);
                    }
                }
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

    const [ticket, setTicket] = useState(fetchTicket);

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('open');

    function handleSubmit(e) {
        e.preventDefault();
        axios({
            method: 'put',
            url: `/api/tickets/${id}`,
            headers: {
                'Description-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: {
                title: title,
                description: description,
                status: status,
            },
        })
            .then(() => {
                navigate('/tickets');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const [commentStatus, setCommentStatus] = useState('open');
    const [commentPriority, setCommentPriority] = useState('low');

    function handleSendComment(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: `/api/tickets/${id}/comments`,
            headers: {
                'Description-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: {
                comment: commentInput,
                status: commentStatus,
                priority: commentPriority,
            },
        })
            .then(() => {
                setCommentInput('');
                fetchTicket();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyDescription: 'space-between',
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
                    <Link style={{ fontSize: '13px', color: '#9a8888' }} to="/tickets">
                        Tickets
                    </Link>
                </Breadcrumbs>
                <h4>Update Ticket</h4>
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
                                placeholder="Description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <select
                                value={status}
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                }}
                            >
                                <option selected={status == 'open'} value="open">Open</option>
                                <option selected={status == 'closeed'} value="closed">Closed</option>
                            </select>
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
            <div
                style={{
                    width: '90%',
                    border: '1px solid grey',
                    padding: '20px',
                }}
            >
                {status != 'closed' ? (<form onSubmit={handleSendComment} method="post">
                    <h4>Comments</h4>
                    <div className="row">
                        <div className="col-6">
                            <select
                                value={commentStatus}
                                onChange={(e) => {
                                    setCommentStatus(e.target.value);
                                }}
                            >
                                <option selected={commentStatus == 'open'} value="open">Open</option>
                                <option selected={commentStatus == 'closeed'} value="closed">Closed</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <select
                                value={commentPriority}
                                onChange={(e) => {
                                    setCommentPriority(e.target.value);
                                }}
                            >
                                <option selected={commentPriority == 'low'} value="low">Low</option>
                                <option selected={commentPriority == 'medium'} value="medium">Medium</option>
                                <option selected={commentPriority == 'high'} value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-11">
                            <input
                                type="text"
                                placeholder="Comment"
                                value={commentInput}
                                onChange={(e) => {
                                    setCommentInput(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-1">
                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    borderRadius: '0',
                                    backgroundColor: '#1caf9a',
                                    border: 'none',
                                    fontWeight: '200',
                                }}
                            >
                                <SendIcon />
                            </button>
                        </div>
                    </div>
                </form>) : <></>}
                <div className='comments-container'>
                    {comments.map((comment, index) => (
                        <div key={index} className="card mb-3">
                            <div className="card-body d-flex justify-content-between">
                                <p className="card-text comment-text">{comment.comment}</p>
                                {/* <CloseIcon /> */}
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <p className="card-text priority-text">{comment.priority}</p>
                                <p className="card-text status-text">{comment.status}</p>
                                <p className="card-text date-text">{moment(comment.created_at).format('DD MMMM YYYY, HH:mm a')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    token: state.user.currentUser,
});

export default connect(mapStateToProps)(Edit);
