import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Navbar, Nav, Button, Table, Container, Modal, Alert } from 'react-bootstrap';
import axios from "axios";
import QRCode from 'react-qr-code';
import { useNavigate } from "react-router-dom";

export const Submissions = () => {
  const navigate = useNavigate();
  const { form_id_url } = useParams()
  const [currentID, setCurrentID] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const handleCloseError = () => setShowError(false);
  const handleShowError = () => setShowError(true);

  const [submissions, setSubmissions] = useState([]);

  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  const url = `https://bizoni-backend-apis.azurewebsites.net/api/v1/users/${id}/forms/${form_id_url}/submissions`;
  const headers = { Authorization: `Bearer ${token}` };

  async function handleGet() {
    try {
      console.log(url)
      const response = await axios.get(url, { headers: headers });
      console.log('success', response.data); // Handle successful login
      setSubmissions(response.data)
    } catch (error) {
      console.log('error', error); // error.response.data.message
      setError(error.response.data.detail)
      handleShowError()
    }
  };

  async function handlePDF(submissionID) {
    const url_PDF = `https://bizoni-backend-apis.azurewebsites.net/api/v1/users/${id}/forms/${form_id_url}/submissions/${submissionID}/pdf`;
    const headers_PDF = {
      Authorization: `Bearer ${token}`
    };
    try {
      const response = await axios.get(url_PDF, { headers: headers_PDF, responseType: 'arraybuffer' });
      console.log('success', response.data); // Handle successful login

      const blob = new Blob([response.data], { type: "application/pdf" });
      window.open(URL.createObjectURL(blob));

    } catch (error) {
      console.log('error', error); // error.response.data.message
      setError(error.response.data.detail)
      handleShowError()
    }
  };

  async function handleDelete() {
    const url_delete = `https://bizoni-backend-apis.azurewebsites.net/api/v1/users/${id}/forms/${form_id_url}/submissions/${currentID}`;
    try {
      const response = await axios.delete(url_delete, { headers: headers });
      console.log(response.data); // Handle successful login
      console.log('deleted')
      window.location.reload(false);
    } catch (error) {
      console.log('error', error); // error.response.data.message
      setError(error.response.data.detail)
      handleShowError()
    }
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) handleGet()
    return () => { ignore = true; }
  }, []);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (sessionStorage.getItem('loggedin') == 'false') {
        navigate("/login")
      }
    }
    return () => { ignore = true; }
  }, []);

  return (
    <>
      <div className="component-container container d-flex justify-content-center flex-column align-items-center">
        {showError ?
          <Alert className='sticky-top' variant="danger" onClose={() => setShowError(false)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            {(typeof error == 'string') ?
              <p>{error}</p> : null
            }
          </Alert>
          : null}
        <div className="box box-size-forms bg-primary d-flex justify-content-center align-items-center flex-column gap-5">
          <div className="title text-secondary fw-bold">
            <span>Submissions</span>
          </div>
          <Container className='bg-secondary rounded-5 p-3'>
            <p className='fs-1 px-3'>Form: <strong>{'test'}</strong></p>
            {submissions.length ?
              <Table hover className='bg-secondary'>
                <thead>
                  <tr>
                    <th>#</th>
                    {
                      Object.keys(submissions[0]["completed_dynamic_fields"]).map((key, index2) => {
                        return (
                          <td>{key}</td>
                        )
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    submissions.map((submission, index1) => (
                      <tr>
                        <td>{index1 + 1}</td>
                        {Object.keys(submission["completed_dynamic_fields"]).map((key, index2) => {
                          return (
                            <td>{submission["completed_dynamic_fields"][key]}</td>
                          )
                        })}
                        <td>
                          <div className='d-flex gap-3 justify-content-end flex-wrap'>
                            <Button onClick={() => { handlePDF(submission['id']) }} className="rounded-pill fw-bold btn-primary btn-sm px-3">View PDF</Button>
                            <Button onClick={() => { handleShow(); setCurrentID(submission['id']) }} className="rounded-pill fw-bold btn-danger btn-sm px-3">Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              : <h1 className='d-flex text-primary gap-3 justify-content-center py-5'>This form does not have any submissions yet. :(</h1>}
          </Container>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete submission</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure that you want to delete this submission?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Changed my mind
              </Button>
              <Button variant="primary" onClick={(e) => { handleClose(e); handleDelete() }}>
                Delete it!
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  )
}
