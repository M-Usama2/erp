import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Header from './Header'
import List from './List'
import Add from './Add'
import Loader1 from '../template/loaders/Loader1';

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import View from '../payroll/View';

function PayHeadDashboard({ isView = false, isAdding = false, isEditing = false, token }) {


    const fecthData = () => axios({
        method: 'get',
        url: '/api/payheads',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async function (response) {
            if (await response.data.payheads) {
                setPayHeads(response.data.payheads)
                setLoading(false)
            }
        }).catch((err) => {
            console.log(err)
        })

    const [payheads, setPayHeads] = useState(fecthData)
    const [selectedPayHead, setSelectedPayHead] = useState(false)

    const [loading, setLoading] = useState(true)



    const handleEdit = async (id) => {
    }


    // fecthData();
    return (
        loading ? <Loader1 /> :
            <div className='container'>
                {/* List */}
                {!isAdding && !isEditing && !isView && (
                    <>
                        <Header setPayHeads={setPayHeads} />
                        <List
                            payheads={payheads}
                        />
                    </>
                )}
                {/* Add */}
                {isAdding && (
                    <Add
                        payheads={payheads}
                        setPayHeads={setPayHeads} />
                )}
                {/* Edit */}
                {isView && (
                    <View
                        payheads={payheads}
                        selectedPayHead={selectedPayHead}
                        setPayHeads={setPayHeads} />
                )}

            </div>
    )
}
const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    user: state.user.userData
});
export default connect(mapStateToProps)(PayHeadDashboard)
