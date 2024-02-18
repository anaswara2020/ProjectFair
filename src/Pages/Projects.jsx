import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { getAllProjectAPI } from '../services/allApi';

function Projects() {
  const [searchKey,setsearchKey]=useState("")
  const [allProject,setallProject]=useState([]);
  const getAllProject=async()=>{
    try{
      const token=sessionStorage.getItem("token")
      console.log(token);
      if(token){
        const reqHeader={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result=await getAllProjectAPI(searchKey,reqHeader)
        if(result.status===200){
          setallProject(result.data)
        }
      }
    }
    catch(err){
      console.log(err);
    }
  }
  console.log(allProject);
  useEffect(()=>{
    getAllProject()
  },[searchKey])
  return (
    <>
      <Header></Header>
     <div style={{marginTop:'100px'}} className='container-fluid'>
       <div className='d-flex justify-content-between'>
        <h1 className='ms-5'>All Projects</h1>
        <input type="text" onChange={e=>setsearchKey(e.target.value)} style={{width:'300px'}} className='rounded p-2 ' placeholder='Search Product by its Language' />
       </div>
       <Row className='mt-5'>
        {allProject.length>0?allProject?.map((project,index)=>(
        <Col key={index} sm={12} md={6} lg={4}>
        <ProjectCard project={project}></ProjectCard>
        </Col>)):
        <div className='fw-bolder text-danger fs-4'>Nothing to displayy!!!</div>
        }
       </Row>
      </div>
    </>
  )
}

export default Projects