import React, { useEffect, useState } from 'react'
import Template from '../template/Template'
import Chart from "react-apexcharts";
import { Box, Card, CardContent, Paper, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WidgetsIcon from '@mui/icons-material/Widgets';
import InventoryIcon from '@mui/icons-material/Inventory';
import Person from '@mui/icons-material/Group';
import { connect } from 'react-redux';


const Cart = ({ token, st }) => {

    const [state, setState] = useState({
        options: {},
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E']
    });

    const [total, setTotal] = useState(0);
    const [hired, setHired] = useState(0);
    const [waiting, setWaiting] = useState(0);
    const [departments, setDepartments] = useState([]);
    const [per, setPer] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: []
            }
        },
        series: [
            {
                name: "series-1",
                data: []
            },
        ]

    });

    useEffect(() => {
        axios({
            method: 'get',
            url: '/api/count',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async function (response) {
                const counts = response.data.employeeCount[0];
                console.log(counts)
                setTotal(counts.total)
                setHired(counts.hired)
                setWaiting(counts.waiting)
            }).catch((err) => {
                console.log(err)
            })

        axios({
            method: 'get',
            url: '/api/departments',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async function (response) {
                if (await response.data.data) {
                    console.log(response.data.data)
                    const depts = response.data.data;
                    setPer(
                        {
                            options: {
                                chart: {
                                    id: "basic-bar"
                                },
                                xaxis: {
                                    categories: depts.map((dept) => dept.title)
                                }
                            },
                            series: [
                                {
                                    name: "Total",
                                    data: depts.map((dept) => dept.numberOfEmployees)
                                },
                                {
                                    name: "Hired",
                                    data: depts.map((dept) => dept.hired)
                                },
                                {
                                    name: "Waiting",
                                    data: depts.map((dept) => dept.waiting)
                                },
                            ]

                        }
                    )
                }
            });
    }, [])

    return (
        <div className='container'>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                    width: '100%',
                    margin: '20px'
                }}
            >
                <Paper elevation={1}>

                    <Card sx={{ display: 'flex', padding: '20px', alignItems: 'center' }}>
                        <InventoryIcon sx={{ height: 70, width: 70, color: '#26a0fc' }} />

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography sx={{ textAlign: 'start' }} component="div" variant="h6">
                                    Total Resources:
                                </Typography>
                                <Typography sx={{ textAlign: 'center' }} variant="h3" color="text.secondary" component="div">
                                    {total}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Paper>

                <Paper elevation={1}>
                    <Card sx={{ display: 'flex', padding: '20px', alignItems: 'center' }}>

                        <WidgetsIcon sx={{ height: 70, width: 70, color: '#26a0fc' }} />

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h6">
                                    Hired Resources:
                                </Typography>
                                <Typography sx={{ textAlign: 'center' }} variant="h3" color="text.secondary" component="div">
                                    {hired}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Paper>

                <Paper elevation={1}>
                    <Card sx={{ display: 'flex', padding: '20px', alignItems: 'center' }}>
                        <AccessTimeIcon sx={{ height: 70, width: 70, color: '#26a0fc' }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" sx={{ color: 'black' }} variant="h6">
                                    WAITING / OTHERS:
                                </Typography>
                                <Typography sx={{ textAlign: 'center' }} variant="h3" color="text.secondary" component="div">
                                    {waiting}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>

                </Paper>
            </Box>
            <div className="bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
                <Chart options={per.options} series={per.series} type="bar" width="1000" height="330" />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.user.currentUser,
    user: state.user.userData,
    st: state
});

export default connect(mapStateToProps)(Cart);
