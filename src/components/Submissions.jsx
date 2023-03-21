import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Navbar, Nav, Button, Table, Container, Modal, Alert } from 'react-bootstrap';
import axios from "axios";
import QRCode from 'react-qr-code';
import { useNavigate } from "react-router-dom";

export const Submissions = () => {
  const navigate = useNavigate();
  const { form_id_url } = useParams()

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
      <div className="container d-flex justify-content-center flex-column align-items-center p-4">
        {showError ?
          <Alert className='sticky-top' variant="danger" onClose={() => setShowError(false)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            {(typeof error == 'string') ?
              <p>{error}</p> : null
            }
          </Alert>
          : null}
        <div className="box box-size-forms bg-primary p-5 d-flex justify-content-center align-items-center flex-column gap-5">
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
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              : <h1 className='d-flex text-primary gap-3 justify-content-center py-5'>This form does not have any submissions yet. :(</h1>}
          </Container>
        </div>
      </div>
    </>
  )
}
