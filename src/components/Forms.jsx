import React, { useState, useEffect } from 'react'
import logo from "../images/bison_logo.png"
import { Navbar, Nav, Button, Table, Container, Modal } from 'react-bootstrap';

export const Forms = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="container d-flex justify-content-center p-4">
        <div className="box box-size-forms bg-primary p-5 d-flex justify-content-center align-items-center flex-column gap-5">
          <div className="title text-dark fw-bold">
            <span>My Forms</span>
          </div>
          <Button href="/forms/create" className="custom-button medium-button-size rounded-pill fw-bold align-self-start">Create New Form</Button>
          <Container className='bg-secondary rounded-5 p-3'>
            <Table hover className='bg-secondary'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Form Title</th>
                  <th>Creation date</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>2023-07-03</td>
                  <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, similique.</td>
                  <td>
                    <div className='d-flex gap-3'>
                      <Button href="/forms/1/view" className="rounded-pill fw-bold btn-info btn-sm">View</Button>
                      <Button href="/forms/1/edit" className="rounded-pill fw-bold btn-warning btn-sm">Edit</Button>
                      <Button onClick={handleShow} className="rounded-pill fw-bold btn-danger btn-sm">Delete</Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>2023-02-04</td>
                  <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, similique.</td>
                  <td>
                    <div className='d-flex gap-3'>
                      <Button href="/forms/2/view" className="rounded-pill fw-bold btn-info btn-sm">View</Button>
                      <Button href="/forms/2/edit" className="rounded-pill fw-bold btn-warning btn-sm">Edit</Button>
                      <Button onClick={handleShow} className="rounded-pill fw-bold btn-danger btn-sm">Delete</Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Larry the Bird</td>
                  <td>2023-10-02</td>
                  <td>Lorem ipsum dolor sit amet.</td>
                  <td>
                    <div className='d-flex gap-3'>
                      <Button href="/forms/3/view" className="rounded-pill fw-bold btn-info btn-sm">View</Button>
                      <Button href="/forms/2/edit" className="rounded-pill fw-bold btn-warning btn-sm">Edit</Button>
                      <Button onClick={handleShow} className="rounded-pill fw-bold btn-danger btn-sm">Delete</Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Container>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete form</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure that you want to delete this form?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Changed my mind
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Delete it!
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  )
}
