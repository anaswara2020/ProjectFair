import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

function Header({insideDashboard}) {
  return (
    <>
    <Navbar style={{backgroundColor:'#90ee90' ,position:'fixed',top:'0px',zIndex:5,width:'100%'}} className=''>
        <Container>
          <Navbar.Brand href="/"  className='text-light'><i class="fa-solid fa-hands-holding-circle"></i> Project Fair</Navbar.Brand>
        
      {
        insideDashboard&&
        <div className='ms-auto'>
            <button style={{textDecoration:'none'}} className='btn btn-link text-light fw-bolder'><i className='fa-solid fa-right-from-bracket me-2'></i>Logout</button>
        </div>
      }
      </Container>
      </Navbar>
    </>
  )
}

export default Header