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


const Announcement = ({ isAdding = false, isEditing = false, token }) => {
    const fecthData = () => axios({
        method: 'get',
        url: '/api/announcements',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async function (response) {
            if (await response.data) {
                setAnnouncements(response.data.announcements);
                setLoading(false);
            }
            console.log(response.data)
        }).catch((err) => {
            console.log(err)
        });

    const [announcements, setAnnouncements] = useState(fecthData);
    const [selectedTemplate, setSelectedTemplate] = useState(false);

    const [loading, setLoading] = useState(true);


    const handleDelete = async (id) => {
        await axios.delete('/api/announcement/' + id, {
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
                        <Header setAnnouncement={setAnnouncements} />
                        <List
                            announcements={announcements}
                            handleDelete={handleDelete}
                            token={token}
                            fecthData={fecthData}
                        />
                    </>
                )}
                {/* Add */}
                {isAdding && (
                    <Add
                        announcements={announcements}
                        setAnnouncements={setAnnouncements}
                    />
                )}
                {/* Edit */}
                {isEditing && (
                    <Edit
                        announcements={announcements}
                        selectedTemplate={selectedTemplate}
                        setAnnouncements={setAnnouncements}
                    // setIsEditing={setIsEditing}
                    />
                )}
            </div>
    )
}


const mapStateToProps = (state) => ({
    token: state.user.currentUser,
});
export default connect(mapStateToProps)(Announcement)
