import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Header from './Header'
import List from './List'
import Add from './Add'
import Loader1 from '../template/loaders/Loader1';

import axios from 'axios'
import { connect } from 'react-redux'
import Edit from './Edit'

function Dashboard({ isView = false, isAdding = false, isEditing = false, token }) {


    const fecthData = () => axios({
        method: 'get',
        url: '/api/employees',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async function (response) {
            if (await response.data.data) {
                setEmployees(response.data.data)
                setLoading(false)


            }
        }).catch((err) => {
            console.log(err)
        })

    const machineData = () => {
        setLoading(true)
        axios({
            method: 'get',
            url: '/api/employee-machine',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(async function (response) {
            await fecthData();
        }).catch((err) => {
            console.log(err)
        })
    }

    const [employees, setEmployees] = useState(fecthData)

    const [loading, setLoading] = useState(true)



    const handleEdit = async (id) => {
    }

    const handleDelete = async (id) => {
        await axios.delete('/api/employee/' + id, {
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
                {!isAdding && !isEditing && !isView && (
                    <>
                        <Header setEmployees={setEmployees} />
                        <List
                            employees={employees}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            machineData={machineData}

                        />
                    </>
                )}
                {/* Add */}
                {isAdding && (
                    <Add
                        employees={employees}
                        setEmployees={setEmployees} />
                )}
                {/* Edit */}
                {isEditing && (
                    <Edit
                        employees={employees}
                        setEmployees={setEmployees} />
                )}

            </div>
    )
}
const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    user: state.user.userData
});
export default connect(mapStateToProps)(Dashboard)
