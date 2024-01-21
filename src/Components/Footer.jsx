import React from 'react'
import { Col, Row } from 'react-bootstrap'


function Footer() {
  return (
    <div  className='text-white  ' style={{marginTop:'80px',backgroundColor:'#90ee90'}}>
        <Row>
            <Col className='p-4'>
           
            <i class="fa-solid fa-bars-staggered"></i> Project Fair<br />
           <p><b>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos rem iure eligendi maxime amet facis enim!</b></p>
            </Col>
            <Col className='p-4'>
            <h5>Links</h5>
            <a href="/" style={{textDecoration:'none', color:'black'}}>Home</a><br />
            <a href="/projects" style={{textDecoration:'none', color:'black'}}>Projects</a><br />
            <a href="/auth" style={{textDecoration:'none', color:'black'}}>Login</a><br />
            </Col>
            <Col className='p-4'>
            <h5>Guides</h5>
            <p>React</p>
            <p>React Bootstrap</p>
            <p>Routing</p>
            </Col>
            <Col className='p-4'>
            <h5><span>Contact us</span></h5>
            <input type="text" placeholder='enter email'/><br />
            <button type='button' className='mt-2 text-white' style={{width:'213px', backgroundColor:'black'}}>send</button> <br />
            <i className="fa-brands fa-instagram ps-3"></i>  <i className="fa-brands fa-facebook ps-3"></i>
            <i className="fa-brands fa-twitter ps-3"></i> <i className="fa-brands fa-github ps-3"></i>
            </Col>
        </Row>
    </div>
  )
}

export default Footer