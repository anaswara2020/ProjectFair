import React, { useContext, useEffect, useState } from 'react'
import { Modal,Button, Row, Col } from 'react-bootstrap'
import place from '../assets/place.jpg'
import SERVER_URL from '../services/serverUrl'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { updateProjectAPI } from '../services/allApi'
import { updateResponseContext } from '../Context/ContextShare'


function Edit({project}) {

  const {editRsponse,seteditResponse} =useContext(updateResponseContext)
  const[projectData,setprojectData]=useState({
   id:project._id, title:project.title,language:project.language,overview:project.overview,github:project.github,website:project.website,projectImg:""
  })
  const[preview,setpreview]=useState("")

  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => {
    setShow(false)
    setprojectData({
      id:project._id, title:project.title,language:project.language,overview:project.overview,github:project.github,website:project.website,projectImg:""
     })
     setpreview("")
  }

  useEffect(()=>{
    if(projectData.projectImg){
      setpreview(URL.createObjectURL(projectData.projectImg))
    }
    else{
      setpreview("")
    }
  },[projectData.projectImg])

  const handleUpdateProject=async()=>{
    const {id,title,language,overview,github,website,projectImg}=projectData
    if(!title|| !language|| !overview|| !github|| !website){
        toast.info("Please fill the form completelyyy!!")
    }
    else{
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview?reqBody.append("projectImg",projectImg):reqBody.append("projectImg",project.projectImg)

      const token= sessionStorage.getItem("token")
      if(token){
        const reqHeader={
          "Content-Type" :preview? "multipart/form-data":"application/json",
          "Authorization" : `Bearer ${token}`
        }
        console.log("procced to api call");
        try{
          const result =await updateProjectAPI(id,reqBody,reqHeader)
          if(result.status==200){
            handleClose()
            //share response to my project component
            seteditResponse(result.data)
          }else{
            console.log(result);
          }
        }
        catch(err){
          console.log(err);
        }
    }
   }
  }
  return (
    <>
      <button onClick={handleShow} style={{ textDecoration: 'none' }} 
      className='btn btn-link text-success d-flex align-items-center fa-bolder'>
        <i style={{ height: '34px' }} className='fa-solid fa-edit fa-2x'></i></button>

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
                <input type="file" style={{display:'none'}} onChange={e=>setprojectData({...projectData,projectImg:e.target.files[0]})} />
                <img src={preview?preview:`${SERVER_URL}/uploads/${project.projectImg}`} height={'200px'} width={'200px'} className='mt-5' alt="Project upload pic" />
              </label>
            </Col>
            <Col lg={8}>
              <div className='mb-3 '>
                <input type="text" className='rounded p-2 border w-100 ' placeholder='Project Title' value={projectData.title}  onChange={e=>setprojectData({...projectData,title:e.target.value})}/>
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
          <Button variant="success" onClick={handleUpdateProject}>Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} theme='colored'/>

    </>
  )
}

export default Edit