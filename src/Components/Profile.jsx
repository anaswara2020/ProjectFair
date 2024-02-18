import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import log from '../assets/log.png'
import SERVER_URL from '../services/serverUrl';
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfileAPI } from '../services/allApi';


function Profile() {
  const [open, setOpen] = useState(false);
  const [userData, setuserData] = useState({
    username: "", password: "", email: "", github: "", linkedin: "", profileImg: ""
  })

  const [existingImg, setexistingImg] = useState("")
  const [preview, setpreview] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem("userDetails")) {
      const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
      setuserData({ ...userData, username: userDetails.username, password: userDetails.password, email: userDetails.email, github: userDetails.github, linkedin: userDetails.linkedin })
      setexistingImg(userDetails.profile)
    }
  }, [open])

  useEffect(()=>{
    if(userData.profileImg){
      setpreview(URL.createObjectURL(userData.profileImg))
    }
    else{
      setpreview("")
    }
  },[userData.profileImg])
  console.log(userData);

  const handleProfileUpdate=async()=>{
    const{username,password,email,github,linkedin,profileImg}=userData
    if(!github|| !linkedin){
       toast.info("Please fill the form completely!!!")
    }
    else{
      //procced to api call
      const reqbody=new FormData()
      reqbody.append("username",username)
      reqbody.append("password",password)
      reqbody.append("email",email)
      reqbody.append("github",github)
      reqbody.append("linkedin",linkedin)
      preview?reqbody.append("profileImg",profileImg):reqbody.append("existingImg",existingImg)

      const token= sessionStorage.getItem("token")
      if(token){
        const reqHeader={
          "Content-Type" :preview? "multipart/form-data":"application/json",
          "Authorization" : `Bearer ${token}`
        }
        //api call
        try{
          const result=await updateUserProfileAPI(reqbody,reqHeader)
          if(result.status==200){
              setOpen(!open)
              sessionStorage.setItem("userDetails",JSON.stringify(result.data))
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
    <div className='border rounded p-2'>
      <div className='d-flex justify-content-between'>
        <h2>Profile</h2>
        <button onClick={() => setOpen(!open)} className='btn btn-outline-warning'><i className='fa-solid fa-caret-down'></i></button>
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text" className='text-center'>
            <label>
              <input type="file" style={{ display: 'none' }} onChange={e=>setuserData({...userData,profileImg:e.target.files[0]})}/>
              {existingImg==""?
                <img width={'200px'} height={'200px'} className='img-fluid rounded-circle' src={preview?preview:log} alt="upload profile pic" />:
                <img width={'200px'} height={'200px'} className='img-fluid rounded-circle' src={preview?preview:`${SERVER_URL}/uploads/${existingImg}`} alt="upload profile pic" />

              }         
              </label>
            <div className='mb-2 mt-4'>
              <input type="text" className='rounded w-75 p-1' placeholder='Enter your GitHub Link Here' value={userData.github} onChange={e=>setuserData({...userData,github:e.target.value})}/>
            </div>
            <div className='mb-2 mt-3'>
              <input type="text" className='rounded w-75 p-1' placeholder='Enter your LinkedIn Link Here' value={userData.linkedin} onChange={e=>setuserData({...userData,linkedin:e.target.value})}/>
            </div>
            <div className='mb-3 mt-3 d-grid w-75 mx-auto'>
              <button className='btn btn-warning' onClick={handleProfileUpdate}>Update</button>
            </div>
        </div>
      </Collapse>
      <ToastContainer autoClose={3000} theme='colored'/>

    </div>
  )
}

export default Profile