import React, { useState } from 'react'
import { Card, Modal, Row ,Col } from 'react-bootstrap'

function ProjectCard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     <Card className='shadow mb-5 btn' style={{ width: '28rem' }} onClick={handleShow}>
      <Card.Img variant="top" src="https://png.pngtree.com/thumb_back/fh260/background/20200731/pngtree-blue-carbon-background-with-sport-style-and-golden-light-image_371487.jpg" />
      <Card.Body>
        <Card.Title className='text-dark'>Card Title</Card.Title>
       
      </Card.Body>
    </Card>

    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
                  <img className='img-fluid' src="https://png.pngtree.com/thumb_back/fh260/background/20200731/pngtree-blue-carbon-background-with-sport-style-and-golden-light-image_371487.jpg" alt="Project image" />
            </Col>
            <Col sm={12} md={6}>
              <h2 className='fw-bolder text-warning'>Title</h2>
              <p>Project Overview:<span className='fw-bolder'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea id, deserunt vero, veritatis illum commodi voluptatum nostrum cumque reiciendis iusto cum molestias voluptas dolorum vel ducimus harum debitis iste quae!</span></p>
              <p>Language used:<span className='fw-bolder text-danger'>HTML,CSS,JS</span></p>
            </Col>
          </Row>
          <div className='mt-3'>
              <a href="" target='_blank' style={{cursor:'pointer',color:'black'}}><i style={{height:'34px'}} className='fa-brands fa-github fa-2x'></i></a>
              <a href="" target='_blank' style={{cursor:'pointer',color:'black'}} className='ms-5'><i style={{height:'34px'}} className='fa-solid fa-link fa-2x'></i></a>

          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard