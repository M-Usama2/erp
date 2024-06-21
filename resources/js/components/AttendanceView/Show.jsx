import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin! // a plugin!
import { connect } from 'react-redux';
import moment from 'moment/moment';

function Show({ token }) {
    const { id } = useParams();

    const renderAttendance = async () => axios({
        metod: 'get',
        url: `/api/attendance/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    },
    ).then(res => {
        const data = res.data.attendance;
        const employee = res.data.employee;
        const holidays = res.data.holidays;
        const leaves = res.data.leaves;
        var employeeAttendance = [];

        for (let index = 0; index < data.length; index++) {
            employeeAttendance[index] = {
                title: data[index].status ? `${data[index].time_in} - ${data[index].time_out}` : 'Absent',
                date: data[index].created_at,
                color: data[index].status ? 'green' : 'red'
            };
            if (data[index].late) {
                employeeAttendance[index] = {
                    title: `${data[index].time_in} - ${data[index].time_out}`,
                    date: data[index].created_at,
                    color: 'red'
                };
            }
        }

        const currentLength = employeeAttendance.length;

        for (let index = currentLength; index < ((currentLength) + holidays.length); index++) {
            employeeAttendance[index] = {
                title: holidays[index - currentLength].occasion,
                date: holidays[index - currentLength].dated_sql,
                color: 'orange'
            };
        }

        const currentLength2 = employeeAttendance.length;

        for (let index = currentLength2; index < ((currentLength2) + leaves.length); index++) {
            employeeAttendance[index] = {
                title: 'Leave : ' + leaves[index - currentLength2].reason + ` (${leaves[index - currentLength2].start_date_formatted} - ${leaves[index - currentLength2].end_date_formatted})`,
                start: leaves[index - currentLength2].start_date_sql,
                end: moment(leaves[index - currentLength2].end_date_sql).add(1, 'days').format('YYYY-MM-DD'),
                color: 'blue'
            };
        }

        setAttendance(employeeAttendance);
        setEmployee(employee);
        setTitle(employee.name);
        // setLoading(false);
    }
    ).catch((err) => { console.log(err) });

    const [attendance, setAttendance] = useState(renderAttendance)
    const [employee, setEmployee] = useState([{}])
    const [title, setTitle] = useState('')


    return (
        <div className='contain-table'>

            <div style={{ marginTop: '30px', fontWeight: '200', fontSize: '18px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#4b8df8', width: '100%', padding: '7px 15px' }}>
                <div>
                    <PeopleAltIcon style={{ fontSize: '22px', }} /> Attendance of {title}
                </div>
            </div>
            <div className="row ml-2">
                <div className="col-md-6 m-2">
                    <a href={`/attendance-report/${employee?.id}`} className="btn btn-primary" target='_blank'>Show Report</a>
                </div>
            </div>
            <div style={{ marginTop: '', border: '1px solid #4b8df8', padding: '20px' }}>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    themeSystem='bootstrap5'
                    events={attendance}
                    eventAllow={true}
                />
            </div>
        </div>

    )
}

const mapStateToProps = (state) => ({
    token: state.user.currentUser,
});

export default connect(mapStateToProps)(Show)
