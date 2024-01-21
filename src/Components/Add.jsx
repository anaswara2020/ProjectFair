import React, { useState } from 'react'
import { Modal,Button, Row, Col } from 'react-bootstrap'
import place from '../assets/place.jpg'


function Add() {
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

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
                <input type="file" style={{display:'none'}} />
                <img src={place} height={'200px'} width={'200px'} className='mt-5' alt="Project upload pic" />
              </label>
            </Col>
            <Col lg={8}>
              <div className='mb-3 '>
                <input type="text" className='rounded p-2 border w-100 ' placeholder='Project Title' />
              </div>
              <div className='mb-3'>
                <input type="text" className='rounded p-2 border w-100 ' placeholder='Language Used' />
              </div>
              <div className='mb-3'>
                <input type="text" className='rounded p-2 border w-100 ' placeholder='Project Github link' />
              </div>
              <div className='mb-3'>
                <input type="text" className='rounded p-2 border w-100 ' placeholder='Project Website Link' />
              </div>
              <div className='mb-3'>
                <input type="text" className='rounded p-2 border w-100 ' placeholder='Project Overview' />
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success">Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add