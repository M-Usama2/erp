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

const RoleDasboard = ({ isAdding = false, isEditing = false, token }) => {


    const fecthData = () => axios({
        method: 'get',
        url: '/api/roles',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async function (response) {
            if (await response.data.data) {
                setTemplates(response.data.data);
                setLoading(false);
            }
            console.log(response)
        }).catch((err) => {
            console.log(err)
        });

    const [roles, setTemplates] = useState(fecthData);
    const [selectedTemplate, setSelectedTemplate] = useState(false);

    const [loading, setLoading] = useState(true);



    const handleEdit = async (id) => {

    }

    const handleDelete = async (id) => {
        await axios.delete('/api/user/' + id, {
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
                        <Header setTemplates={setTemplates} />
                        <List
                            roles={roles}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            token={token}
                            fecthData={fecthData}
                        />
                    </>
                )}
                {/* Add */}
                {isAdding && (
                    <Add
                        roles={roles}
                        setTemplates={setTemplates}
                    />
                )}
                {/* Edit */}
                {isEditing && (
                    <Edit
                        roles={roles}
                        selectedTemplate={selectedTemplate}
                        setTemplates={setTemplates}
                    // setIsEditing={setIsEditing}
                    />
                )}
            </div>
    )
}
const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    roles: state.user.userData
});
export default connect(mapStateToProps)(RoleDasboard)
