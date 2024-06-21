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


const Team = ({ isAdding = false, isEditing = false, token }) => {
    const fecthData = () => axios({
        method: 'get',
        url: '/api/teams',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async function (response) {
            if (await response.data) {
                setTeams(response.data.teams);
                setLoading(false);
            }
            console.log(response.data)
        }).catch((err) => {
            console.log(err)
        });

    const [teams, setTeams] = useState(fecthData);
    const [selectedTemplate, setSelectedTemplate] = useState(false);

    const [loading, setLoading] = useState(true);


    const handleDelete = async (id) => {
        await axios.delete('/api/team/' + id, {
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
                        <Header setTeam={setTeams} />
                        <List
                            teams={teams}
                            handleDelete={handleDelete}
                            token={token}
                            fecthData={fecthData}
                        />
                    </>
                )}
                {/* Add */}
                {isAdding && (
                    <Add
                        teams={teams}
                        setTeams={setTeams}
                    />
                )}
                {/* Edit */}
                {isEditing && (
                    <Edit
                        teams={teams}
                        selectedTemplate={selectedTemplate}
                        setTeams={setTeams}
                    // setIsEditing={setIsEditing}
                    />
                )}
            </div>
    )
}


const mapStateToProps = (state) => ({
    token: state.user.currentUser,
});
export default connect(mapStateToProps)(Team)
