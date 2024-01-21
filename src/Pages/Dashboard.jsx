import React from 'react'
import Header from '../Components/Header'
import MyProjects from '../Components/MyProjects'
import Profile from '../Components/Profile'

function Dashboard() {
  return (
    <>
    <Header insideDashboard></Header>
    <div style={{marginTop:'100px'}} className='container-fluid'>
      <h1>Welcome <span className='text-warning'>User</span></h1>
      <div className='row'>
        <div className='col-lg-8'>
          <MyProjects></MyProjects>
        </div>
        <div className='col-lg-4'>
          <Profile></Profile>
        </div>
      </div>
    </div>

    </>
  )
}

export default Dashboard