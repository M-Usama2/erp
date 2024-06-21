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

const AttendanceSettingDashboard = ({ isAdding = false, isEditing = false, token }) => {


    const fecthData = () => axios({
        method: 'get',
        url: '/api/attendance_settings',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async function (response) {
            if (await response.data.settings) {
                setAttendanceSettings(response.data.settings)
                setLoading(false);
            }
        }).catch((err) => {
            console.log(err)
        });

    const [settings, setAttendanceSettings] = useState(fecthData);
    const [selectedAttendanceSetting, setSelectedAttendanceSetting] = useState(false);

    const [loading, setLoading] = useState(true);

    return (
        loading ? <Loader1 /> :
            <div className='container'>
                {/* List */}
                {!isAdding && !isEditing && (
                    <>
                        <Header setAttendanceSettings={setAttendanceSettings} />
                        <List
                            settings={settings}
                        />
                    </>
                )}
                {/* Add */}
                {isAdding && (
                    <Add
                        settings={settings}
                        setAttendanceSettings={setAttendanceSettings}
                    />
                )}
                {/* Edit */}
                {isEditing && (
                    <Edit
                        settings={settings}
                        selectedAttendanceSetting={selectedAttendanceSetting}
                        setAttendanceSettings={setAttendanceSettings}
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
export default connect(mapStateToProps)(AttendanceSettingDashboard)
