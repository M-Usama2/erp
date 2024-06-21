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


const Customer = ({ isAdding = false, isEditing = false, token }) => {
    const fecthData = () => axios({
        method: 'get',
        url: '/api/customers',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async function (response) {
            if (await response.data) {
                setCustomers(response.data.customers);
                setLoading(false);
            }
            console.log(response.data)
        }).catch((err) => {
            console.log(err)
        });

    const [customers, setCustomers] = useState(fecthData);
    const [selectedTemplate, setSelectedTemplate] = useState(false);

    const [loading, setLoading] = useState(true);


    const handleDelete = async (id) => {
        await axios.delete('/api/customer/' + id, {
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

    return (
        loading ? <Loader1 /> :
            <div className='container'>
                {/* List */}
                {!isAdding && !isEditing && (
                    <>
                        <Header setCustomer={setCustomers} />
                        <List
                            customers={customers}
                            handleDelete={handleDelete}
                            token={token}
                            fecthData={fecthData}
                        />
                    </>
                )}
                {/* Add */}
                {isAdding && (
                    <Add
                        customers={customers}
                        setCustomers={setCustomers}
                    />
                )}
                {/* Edit */}
                {isEditing && (
                    <Edit
                        customers={customers}
                        selectedTemplate={selectedTemplate}
                        setCustomers={setCustomers}
                    // setIsEditing={setIsEditing}
                    />
                )}
            </div>
    )
}


const mapStateToProps = (state) => ({
    token: state.user.currentUser,
});
export default connect(mapStateToProps)(Customer)
