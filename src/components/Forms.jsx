import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Button, Table, Container, Modal } from 'react-bootstrap';
import axios from "axios";

export const Forms = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState("");

  const [titles, setTitles] = useState([]);
  const [delete_id, setDelete_id] = useState('');  

  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  const url = `https://bizoni-backend-apis.azurewebsites.net/api/v1/users/${id}/forms/`;
  const headers = {
    // 'accept': 'application/json',
    Authorization: `Bearer ${token}`
  };

  async function handleGet() {
    console.log(token)
    try {
      const response = await axios.get(url, { headers: headers });
      console.log(response.data); // Handle successful login
      setTitles(response.data['form_list'])
      console.log(titles)
      console.log('success')
    } catch (err) {
      console.log('error'); // error.response.data.message
      console.log(err)
    }
  };

  async function handleDelete() {
    const delete_url = `${url}${delete_id}`;
    try {
      const response = await axios.delete(delete_url, { headers: headers });
      console.log(response.data); // Handle successful login
      console.log('deleted')
      window.location.reload(false);
    } catch (err) {
      console.log('error'); // error.response.data.message
      console.log(err)
    }
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) handleGet()
    return () => { ignore = true; }
  }, []);

  return (
    <>
      <div className="container d-flex justify-content-center p-4">
        <div className="box box-size-forms bg-primary p-5 d-flex justify-content-center align-items-center flex-column gap-5">
          <div className="title text-secondary fw-bold">
            <span>My Forms</span>
          </div>
          <Button href="/forms/create" className="custom-button medium-button-size rounded-pill fw-bold align-self-start">Create New Form</Button>
          <Container className='bg-secondary rounded-5 p-3'>
          {titles.length ? 
            <Table hover className='bg-secondary'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Form Title</th>
                  {/* <th>Creation date</th>
                  <th>Description</th> */}
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {titles.map((title, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{title['title']}</td>
                    {/* <td>2023-02-04</td>
                    <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, similique.</td> */}
                    <td></td>
                    <td>
                      <div className='d-flex gap-3 justify-content-end'>
                        <Button href={`/forms/fill/${title['id']}`} className="rounded-pill fw-bold btn-info btn-sm">Fill </Button>
                        <Button href={`/forms/create`} className="rounded-pill fw-bold btn-warning btn-sm">Edit</Button>
                        <Button onClick={() => {handleShow(); setDelete_id(title['id'])}} className="rounded-pill fw-bold btn-danger btn-sm">Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))} 
              </tbody>
            </Table>
              : <h1 className='d-flex text-primary gap-3 justify-content-center py-5'>You do not have any forms yet. :(</h1>}
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
              <Button variant="primary" onClick={(e) => {handleClose(e); handleDelete()}}>
                Delete it!
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  )
}
