import React from 'react'
import Add from '../Components/Add'
import Edit from '../Components/Edit'

function MyProjects() {
  return (
    <div className='border rounded p-2'>
      <div className='d-flex justify-content-between'>
          <h2>My Projects</h2>
          <Add></Add>
      </div>
      <div className='mt-4'>
       <div className='border rounded d-flex justify-content-between align-items-center mb-3 p-2'>
        <h5>Title</h5>
        <div className='icons d-flex align-items-center'>
          <Edit></Edit>
          <a href="" target='_blank' className='btn btn-link ms-2' ><i style={{height:'34px'}} className='fa-brands fa-github fa-2x'></i></a>
          <button className='btn btn-link text-danger ms-1'><i style={{height:'34px'}} className='fa-solid fa-trash fa-2x'></i></button>
        </div>
       </div>
      </div>
    </div>
  )
}

export default MyProjects