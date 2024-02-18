import React, { useContext, useEffect, useState } from 'react'
import { Modal,Button, Row, Col } from 'react-bootstrap'
import place from '../assets/place.jpg'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allApi';
import { addResponseContext } from '../Context/ContextShare';


function Add() {
  const {addResponse,setaddResponse}= useContext(addResponseContext)
  const[projectData,setprojectData]=useState({
    title:"",language:"",overview:"",github:"",website:"",projectImg:""
  })
  const[imageFileStatus,setimageFileStatus]=useState(false)
  const[preview,setpreview]=useState("")
  console.log(projectData);
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () =>{ 
    setShow(false)
    setprojectData({title:"",language:"",overview:"",github:"",website:"",projectImg:""})
    setpreview(place)
  }
  const handleProjectUpload=async()=>{
    const {title,language,overview,github,website,projectImg}=projectData
    if(!title ||!overview ||!language||!github||!website||!projectImg){
      toast.info("Please fill the form completely!!!")
    }else{
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImg",projectImg)

         const token = sessionStorage.getItem("token")
      if(token){
      const reqHeader = {
        "Content-Type" : "multipart/form-data",
        "Authorization" : `Bearer ${token}`
      }
      console.log("proceed to api-call");
      try{
        const result =await addProjectAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
          // toast.success(`New Project ${result.data.title} has added successfully!!!`);
          //share response to context
          setaddResponse(result.data)
          handleClose()
        }else{
          toast.warning(result.response.data)
        }
      }
      catch(err){
          console.log(err);
      }
    }
    }

  }

  useEffect(()=>{
    if(projectData.projectImg?.type=="image/png"||projectData.projectImg?.type=="image/jpg"||projectData.projectImg?.type=="image/jpeg"){
      // console.log("generate image url")
      setimageFileStatus(true)
      setpreview(URL.createObjectURL(projectData.projectImg))
    }else{
      setpreview("")
      setimageFileStatus(false)
      // console.log("Upload only the following file type(jpg,jpeg,png)");
    }
  },[projectData.projectImg])

  return (
    <>
      <button onClick={handleShow} style={{ textDecoration: 'none' }} 
      className='btn btn-link text-warning d-flex align-items-center fa-bolder'>
        <i style={{ height: '34px' }} className='fa-solid fa-plus fa-2x'></i> Add Project</button>

      <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={4}>
              <label className='w-100 d-flex align-items-center flex-column justify-content-center'>
                <input type="file" style={{display:'none'}} onChange={e=>setprojectData({...projectData,projectImg:e.target.files[0]})}/>
                <img src={preview?preview:place} height={'200px'} width={'200px'} className='mt-5' alt="Project upload pic" />
              </label>
              {!imageFileStatus&& <div className='text-danger text-center'>*Upload only the following file type(jpg,jpeg,png)*</div>}
            </Col>
            <Col lg={8}>
              <div className='mb-3 '>
                <input type="text" className='rounded p-2 border w-100 ' placeholder='Project Title' value={projectData.title} onChange={e=>setprojectData({...projectData,title:e.target.value})} />
              </div>
              <div className='mb-3'>
                <input type="text" className='rounded p-2 border w-100 ' placeholder='Language Used' value={projectData.language} onChange={e=>setprojectData({...projectData,language:e.target.value})}/>
              </div>
              <div className='mb-3'>
                <input type="text" className='rounded p-2 border w-100 ' placeholder='Project Github link' value={projectData.github} onChange={e=>setprojectData({...projectData,github:e.target.value})}/>
              </div>
              <div className='mb-3'>
                <input type="text" className='rounded p-2 border w-100 ' placeholder='Project Website Link' value={projectData.website} onChange={e=>setprojectData({...projectData,website:e.target.value})}/>
              </div>
              <div className='mb-3'>
                <input type="text" className='rounded p-2 border w-100 ' placeholder='Project Overview' value={projectData.overview} onChange={e=>setprojectData({...projectData,overview:e.target.value})}/>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleProjectUpload} variant="success">Save</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} theme='colored'/>
    </>
  )
}

export default Add