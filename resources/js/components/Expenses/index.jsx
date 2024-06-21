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

const Expense = ({ isAdding = false, isEditing = false, token }) => {


    const fecthData = () => axios({
        method: 'get',
        url: '/api/expense',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async function (response) {
            if (await response.data.data) {
                setExpense(response.data.data);
                setLoading(false);
            }
            console.log(response)
        }).catch((err) => {
            console.log(err)
        });

    const [expense, setExpense] = useState(fecthData);
    const [selectedTemplate, setSelectedTemplate] = useState(false);

    const [loading, setLoading] = useState(true);


    const handleDelete = async (id) => {
        await axios.delete('/api/expense/' + id, {
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
                        <Header expense={expense} />
                        <List
                            expense={expense}
                            handleDelete={handleDelete}
                            token={token}
                            fecthData={fecthData}
                        />
                    </>
                )}
                {/* Add */}
                {isAdding && (
                    <Add
                    expense={expense}
                    />
                )}
                {/* Edit */}
                {isEditing && (
                    <Edit
                    expense={expense}
                        selectedTemplate={selectedTemplate}
                    // setIsEditing={setIsEditing}
                    />
                )}
            </div>
    )
}
const mapStateToProps = (state) => ({
    token: state.user.currentUser,
});
export default connect(mapStateToProps)(Expense)
