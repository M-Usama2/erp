import React, { useEffect, useState } from 'react'
import Header from './Header'
import Loader1 from '../template/loaders/Loader1';

import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Stack } from '@mui/material'
import View from './View'
import Show from './Show';

const ViewAttendance = ({ isAdding = false, isView = false, token }) => {

    // Pagination FUnctions

    const { page } = useParams();

    const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

    const paginate = (end) => {
        const currentPage = page ? page : 1;
        return <Stack className='mt-2' spacing={5}><Pagination
            variant="outlined"
            count={end}
            defaultPage={parseInt(currentPage)}
            renderItem={(item) => (
                <PaginationItem
                    component={"a"}
                    href={`/viewattendance/${item.page === 1 ? '' : `${item.page}`}`}
                    {...item}
                />
            )}
        /></Stack>
    }

    const machineData = () => {
        setLoading(true)
        axios({
            method: 'get',
            url: '/api/attendance-machine',
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

    // Get Data
    const fecthData = () => {
        axios({
            method: 'get',
            url: `/api/employees?page=${page}&month=${month}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async function (response) {
                console.log('test', response);
                if (await response.data.data) {
                    const data = response.data.data;
                    const employeePagination = response.data.pagination;
                    setEmployees(data)
                    setPagination(paginate(employeePagination.last_page));
                    setLoading(false);
                }
            });
    }

    const [employees, setEmployees] = useState(fecthData);
    const [selectedEmployee, setSelectedEmployee] = useState(false);
    const [pagination, setPagination] = useState([]);
    const [loading, setLoading] = useState(true);

    // fecthData();

    useEffect(() => {
        setLoading(true)
        fecthData();
    }, [month])



    return (
        loading ? <Loader1 /> :
            <div className='container'>
                {/* List */}
                {!isAdding && !isView && (
                    <>
                        <Header
                            searchInput={true}
                            setEmployees={setEmployees}
                            employees={employees}
                            month={month}
                            setMonth={setMonth}
                        />
                        <View
                            pagination={pagination}
                            employees={employees}
                            machineData={machineData}

                        />
                    </>
                )}
                {isView && (
                    <>
                        <Header
                            setEmployees={setEmployees}
                            employees={employees}
                        />
                        <Show
                        />
                    </>
                )}
            </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    user: state.user.userData
});
export default connect(mapStateToProps)(ViewAttendance)
