import React from 'react'
import Header from '../../other/Header'
import CreateTask from '../../other/CreateTask'
import AllTask from '../../other/AllTask'

const AdminDashboard = ({ changeUser }) => {
    return (
        <div className='min-h-screen bg-[#0a0a0a] p-6 md:p-10'>
            <Header changeUser={changeUser} />
            <CreateTask />
            <AllTask />
        </div>
    )
}

export default AdminDashboard