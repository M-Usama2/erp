import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Header from './Header'
import List from './List'
import Edit from './Edit'
import Add from './Add'
import Loader1 from '../template/loaders/Loader1';
import axios from 'axios'
import { connect } from 'react-redux'

const LeaveRequestDashboard = ({ isAdding = false, isEditing = false, token }) => {

    const [filters, setFilters] = useState({
        search: '',
        status: '',
        start_date: '',
        end_date: '',
    });

    const fecthData = () => axios({
        method: 'get',
        url: `/api/leave_requests?search=${filters.search}&status=${filters.status}&start_date=${filters.start_date}&end_date=${filters.end_date}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async function (response) {
            if (await response.data.leaves) {
                setLeaveRequest(response.data.leaves)
                setLoading(false);
            }
        }).catch((err) => {
            console.log(err)
        });

    const [leave_requests, setLeaveRequest] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fecthData()
    }, [filters])  

    const handleDelete = async (id) => {
        await axios.delete('/api/leave_requests/' + id, {
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
        }).catch((err) => {
            console.log(err)
        })
        fecthData()
    }

    const approveRequest = async (id, reject = false) => {
        await axios({
            method: 'put',
            url: (!reject ? `/api/leave_requests/${id}/approve` : `/api/leave_requests/${id}/reject`),
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        ).then((res) => {
            fecthData()
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        loading ? <Loader1 /> :
            <div className='container'>
                {/* List */}
                {!isAdding && !isEditing && (
                    <>
                        <Header setLeaveRequest={setLeaveRequest} />
                        <List
                            leave_requests={leave_requests}
                            handleDelete={handleDelete}
                            approveRequest={approveRequest}
                            filters={filters}
                            setFilters={setFilters}
                        />
                    </>
                )}
                {/* Add */}
                {isAdding && (
                    <Add />
                )}
                {/* Edit */}
                {isEditing && (
                    <Edit />
                )}
            </div>
    )
}
const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    user: state.user.userData
});
export default connect(mapStateToProps)(LeaveRequestDashboard)
