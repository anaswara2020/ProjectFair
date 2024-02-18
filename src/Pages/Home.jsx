import React, { useEffect, useState } from 'react'
import code from '../assets/code.png'
import { Link, useNavigate } from 'react-router-dom'
import ProjectCard from '../Components/ProjectCard'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectAPI } from '../services/allApi'


function Home() {
    const[allProjects,setallProjects]=useState([]);
    const [loginStatus,setloginStatus]=useState(false)
    const navigate=useNavigate()

    const getHomeProject=async()=>{
        try{
            const result=await getHomeProjectAPI()
            if(result.status===200){
                setallProjects(result.data)
            }
        }catch(err){
            console.log(err);
        }
    }
    console.log(allProjects);
    useEffect(()=>{
        getHomeProject()
        if(sessionStorage.getItem("token")){
            setloginStatus(true)
        }
        else{
            setloginStatus(false)
        }
    })
    const handleNavigate=()=>{
        if(loginStatus===true){
            navigate('/Projects')
        }else{
            toast.warning("Please login to get full access to our projects!!!")
        }
    }
  return (
<>
            <div style={{height:'100vh',backgroundColor:'#90ee90'}} className='w-100 d-flex justify-content-center align-items-center'>
             <div className='container'>
              <div className='row align-items-center'>
                <div className='col-lg-6'>
                <h1 style={{fontSize:'80px'}} className='fw-bolder text-light mb-3'><i class="fa-solid fa-hands-holding-circle"></i> Project Fair</h1>
                <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas velit unde cum magni odio adipisci accusantium esse consequatur officia sapiente. Repellendus, ea veritatis? Magnam possimus illo enim consectetur assumenda minus.</p>
                {loginStatus?<Link className='btn btn-warning mt-3' to={'/dashboard'}>Manage your projects 
                <i className='fa-solid fa-arrow-right'></i></Link>:<Link className='btn btn-warning mt-3' to={'/login'}>Start to Explore 
                <i className='fa-solid fa-arrow-right'></i></Link>}
                </div>
                <div className='col-lg-1'></div>
                <div className='col-lg-4'>
                    <img src={code} style={{height:'400px',width:'100%'}} alt="" className='img-fluid'/>
                </div>
              </div>
             </div>
            </div>
    <div className='mt-5'>
        <h1 className='text-center mb-5'>Explore Our Projects</h1>
        <marquee>
            <div className='d-flex'>
               { allProjects.length>0&& allProjects.map((project,index)=>(
                    <div key={index} className='Project me-5'>
                    <ProjectCard project={project}/>
                </div>
               ))
               }
            </div>
        </marquee>
        <div className='text-center'>
            <button onClick={handleNavigate} className='btn btn-link'>View More Projects</button>
        </div>
        <ToastContainer autoClose={3000} theme='colored'/>
    </div>
</>        
    )
}

export default Home