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

const HolidayDashboard = ({ isAdding = false, isEditing = false, token }) => {


    const fecthData = () => axios({
        method: 'get',
        url: '/api/holidays',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async function (response) {
            if (await response.data.holidays) {
                setHolidays(response.data.holidays)
                setLoading(false);
            }
        }).catch((err) => {
            console.log(err)
        });

    const [holidays, setHolidays] = useState(fecthData);
    const [selectedHoliday, setSelectedHoliday] = useState(false);

    const [loading, setLoading] = useState(true);



    const handleEdit = async (id) => {

    }

    const handleDelete = async (id) => {
        await axios.delete('/api/holidays/' + id, {
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



    // fecthData();



    return (
        loading ? <Loader1 /> :
            <div className='container'>
                {/* List */}
                {!isAdding && !isEditing && (
                    <>
                        <Header setHolidays={setHolidays} />
                        <List
                            holidays={holidays}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    </>
                )}
                {/* Add */}
                {isAdding && (
                    <Add
                        holidays={holidays}
                        setHolidays={setHolidays}
                    />
                )}
                {/* Edit */}
                {isEditing && (
                    <Edit
                        holidays={holidays}
                        selectedHoliday={selectedHoliday}
                        setHolidays={setHolidays}
                    // setIsEditing={setIsEditing}
                    />
                )}
            </div>
    )
}
const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    user: state.user.userData
});
export default connect(mapStateToProps)(HolidayDashboard)
