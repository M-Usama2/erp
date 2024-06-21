import React from 'react'
import Bread from '../BreadCrumps/Bread';

function Header({ setEmployees, employees, searchInput = false, month, setMonth }) {

    const search = async (e) => {
        let key = e.target.value;
        let result = await fetch(`/api/search/${key}`);
        result = await result.json();
        if (result) {
            setEmployees(result)
        } else {

        }
    }

    return (
        <header >
            {/* <h1>Employee Management System</h1> */}
            <div style={{ display: 'flex', alignItems: 'center' }}>

                <p style={{ fontWeight: '300', fontSize: '40px', marginRight: '10px' }}>Attendance</p>
                <span style={{ fontWeight: '100' }}>View Employee Attendance</span>
            </div>

            <Bread name={'View Attendance'} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
                <div >
                    {/* <Link className='' style={{ display: 'flex',alignItems: 'center', fontSize: '14px',borderRadius: 'none','background': '#35aa47', 'color': "white", "padding": "8px 20px", 'textDecoration': 'none' }} to={'/employees/add'}> Add New Employee <ControlPointIcon style={{padding: '3px'}} /></Link> */}
                    {/* <button onClick={() => setIsAdding(true)} className='round-button'>Add Button</button> */}
                    {/* <a href='' >ADD</a> */}
                </div>
                {searchInput ?
                    <div style={{ display: 'flex', alignItems: 'center', }}>
                        <input type="text" placeholder={`Search`} style={{ borderRadius: '0', width: '100%', padding: '10px 25px', outline: 'none' }} onChange={search} />
                    </div> : null}
            </div>
        </header>
    )
}

export default Header
