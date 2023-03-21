import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const handleCloseError = () => setShowError(false);
  const handleShowError = () => setShowError(true);

  const url = 'https://bizoni-backend-apis.azurewebsites.net/api/v1/login';

  // useEffect(() => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      const output_data = {
        username: email,
        password: password
      }
      const response = await axios.post(url, output_data, { headers: headers });
      console.log(response.data);
      sessionStorage.setItem('token', response.data.access_token);
      sessionStorage.setItem('id', response.data.user_id);
      alert("Login Success!");
      navigate("/forms");
    } catch (error) {
      console.log('error', error);
      console.log(error.response.data.detail)
      setError(error.response.data.detail)
      handleShowError()
    }
  };

  return (
    <div className="container d-flex justify-content-center flex-column align-items-center p-4">
      {showError ?
        <Alert className='sticky-top' variant="danger" onClose={() => setShowError(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          {(typeof error == 'string') ?
            <p>{error}</p> : <p>Please fill all the fields.</p>
          }
        </Alert>
        : null}
      <div className='box bg-primary p-5 d-flex justify-content-center align-items-center flex-column gap-5'>
        <div className='title d-flex justify-content-center text-secondary fw-bold'>
          Login
        </div>
        <Container>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Form.Label>
                <h3 className="text-center text-secondary mb-0">Email</h3>
              </Form.Label>
              <Form.Control className="mb-4" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <Form.Label>
                <h3 className="text-center text-secondary mb-0">Password</h3>
              </Form.Label>
              <Form.Control className="mb-4" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <br />
            <div className="d-flex justify-content-center align-items-center mb-4">
              <Button className="custom-button rounded-pill fw-bold mb-3" type="submit">Login</Button>
            </div>
          </form>
          <h3 className="text-center text-secondary">Don't have an account yet? <a className="fw-bold text-secondary" href="/signup">Sign up</a></h3>

        </Container>
      </div>
    </div>
  )
}
