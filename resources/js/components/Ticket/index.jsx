import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Header from './Header'
import List from './List'
import Edit from './Edit'
import Add from './Add'
import Loader1 from '../template/loaders/Loader1';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'


const Ticket = ({ isAdding = false, isEditing = false, token }) => {
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        priority: '',
        created_at: ''
    });
    const fecthData = () => axios({
        method: 'get',
        url: `/api/tickets?search=${filters.search}&status=${filters.status}&priority=${filters.priority}&created_at=${filters.created_at}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async function (response) {
            if (await response?.data?.tickets) {
                setTickets(response.data.tickets);
                setLoading(false);
            } else {
                setTickets([]);
                setLoading(false);
            }
            console.log(response.data)
        }).catch((err) => {
            console.log(err)
        });

    const [tickets, setTickets] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(false);

    const [loading, setLoading] = useState(true);


    const handleDelete = async (id) => {
        await axios.delete('/api/tickets/' + id, {
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            // console.log('Deleted successfully')
        }).catch((err) => {
            console.log(err)
        })
        fecthData()
    }

    useEffect(() => {
        fecthData()
    }, [filters]);

    return (
        loading ? <Loader1 /> :
            <div className='container'>
                {/* List */}
                {!isAdding && !isEditing && (
                    <>
                        <Header setTicket={setTickets} />
                        <List
                            tickets={tickets}
                            handleDelete={handleDelete}
                            token={token}
                            fecthData={fecthData}
                            filters={filters}
                            setFilters={setFilters}
                        />
                    </>
                )}
                {/* Add */}
                {isAdding && (
                    <Add
                        tickets={tickets}
                        setTickets={setTickets}
                    />
                )}
                {/* Edit */}
                {isEditing && (
                    <Edit
                        tickets={tickets}
                        selectedTemplate={selectedTemplate}
                        setTickets={setTickets}
                    // setIsEditing={setIsEditing}
                    />
                )}
            </div>
    )
}


const mapStateToProps = (state) => ({
    token: state.user.currentUser,
});
export default connect(mapStateToProps)(Ticket)
