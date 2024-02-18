import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import MyProjects from '../Components/MyProjects'
import Profile from '../Components/Profile'

function Dashboard() {
  const[username,setusername]=useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("username")){
       setusername(sessionStorage.getItem("username"))
    }else{
      setusername("")
    }
  })
  return (
    <>
    <Header insideDashboard></Header>
    <div style={{marginTop:'100px'}} className='container-fluid'>
      <h1>Welcome <span className='text-warning'>{username.split(" ")[0]}</span>,</h1>
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