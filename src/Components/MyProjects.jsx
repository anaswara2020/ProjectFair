import React, { useContext, useEffect, useState } from 'react'
import Add from '../Components/Add'
import Edit from '../Components/Edit'
import { deleteProjectAPI, getUSerProjectAPI } from '../services/allApi'
import { addResponseContext, updateResponseContext } from '../Context/ContextShare'

function MyProjects() {
  const { editRsponse, seteditResponse } = useContext(updateResponseContext)
  const { addResponse, setaddResponse } = useContext(addResponseContext)
  const [userProject, setuserProject] = useState()
  const getUserProject = async () => {
    try {
      const token = sessionStorage.getItem("token")
      console.log(token);
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await getUSerProjectAPI(reqHeader)
        if (result.status === 200) {
          setuserProject(result.data)
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  console.log(userProject);
  useEffect(() => {
    getUserProject()
  }, [addResponse, editRsponse])

  const handleDeleteProject = async (projectid) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await deleteProjectAPI(projectid,reqHeader)
        if (result.status == 200) {
          getUserProject()
        }
        else {
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className='border rounded p-2'>
      <div className='d-flex justify-content-between'>
        <h2>My Projects</h2>
        <Add></Add>
      </div>
      <div className='mt-4'>
        {userProject?.length > 0 ? userProject.map((project, index) => (
          <div key={index} className='border rounded d-flex justify-content-between align-items-center mb-3 p-2'>
            <h5>{project?.title}</h5>
            <div className='icons d-flex align-items-center'>
              <Edit project={project}></Edit>
              <a href={project?.github} target='_blank' className='btn btn-link ms-2' ><i style={{ height: '34px' }} className='fa-brands fa-github fa-2x'></i></a>
              <button onClick={() => handleDeleteProject(project._id)} className='btn btn-link text-danger ms-1'><i style={{ height: '34px' }} className='fa-solid fa-trash fa-2x'></i></button>
            </div>
          </div>)) :
          <div className='fw-bolder text-danger'>No Project Added!!</div>
        }
      </div>
    </div>
  )
}

export default MyProjects