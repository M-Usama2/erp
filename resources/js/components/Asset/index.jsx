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

const AssetDashboard = ({ isAdding = false, isEditing = false, token }) => {


    const fecthData = () => axios({
        method: 'get',
        url: '/api/assets',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async function (response) {
            if (await response.data.assets) {
                setAssets(response.data.assets)
                setLoading(false);
            }
        }).catch((err) => {
            console.log(err)
        });

    const [assets, setAssets] = useState(fecthData);
    const [selectedAsset, setSelectedAsset] = useState(false);

    const [loading, setLoading] = useState(true);



    const handleEdit = async (id) => {

    }

    const handleDelete = async (id) => {
        await axios.delete('/api/assets/' + id, {
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
                        <Header setAssets={setAssets} />
                        <List
                            assets={assets}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    </>
                )}
                {/* Add */}
                {isAdding && (
                    <Add
                        assets={assets}
                        setAssets={setAssets}
                    />
                )}
                {/* Edit */}
                {isEditing && (
                    <Edit
                        assets={assets}
                        selectedAsset={selectedAsset}
                        setAssets={setAssets}
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
export default connect(mapStateToProps)(AssetDashboard)
