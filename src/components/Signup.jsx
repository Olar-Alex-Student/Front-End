import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

  const navigate = useNavigate();

  const url = "https://bizoni-backend-apis.azurewebsites.net/api/v1/users/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  const [address, setAddress] = useState("");
  const [fiscalCode, setFiscalCode] = useState("")

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const handleCloseError = () => setShowError(false);
  const handleShowError = () => setShowError(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const output_data = {
        "name": name,
        "email": email,
        "password": password,
        "account_type": accountType,
        "address": address,
        "fiscal_code": fiscalCode
      }
      const response = await axios.post(url, output_data);
      console.log(response.data); // Handle successful login
      console.log(output_data)
      alert("Sign Up Success!")
      navigate("/login");
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
        <div className='title d-flex justify-content-center text-secondary fw-bold p-4'>Signup</div>
        <Container>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Form.Label>
                <h3 className="text-center text-secondary mb-0">Name</h3>
              </Form.Label>
              <Form.Control className="mb-4" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
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
            <div className="form-group">
              <Form.Label>
                <h3 className="text-center text-secondary mb-0">Account Type</h3>
              </Form.Label>
              <br />
              <div className="input-group mb-4">
                <Form.Select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                  <option>Select an Option</option>
                  <option value="individual">Individual</option>
                  <option value="company">Company</option>
                  <option value="public_institution">Public Institution</option>
                </Form.Select>
              </div>
            </div>
            <div>
              {
                (accountType == "company" || accountType == "public_institution") ? <>
                  <Form.Label>
                    <h3 className="text-center text-secondary mb-0">Fiscal Code</h3>
                  </Form.Label>
                  <Form.Control className="mb-3" type="number" placeholder="Fiscal Code" value={fiscalCode} onChange={(e) => setFiscalCode(e.target.value)} />
                </> : null
              }
            </div>
            <div className="form-group">

            </div>
            <div className="form-group">
              <Form.Label>
                <h3 className="text-center text-secondary mb-0">Address</h3>
              </Form.Label>
              <Form.Control className="mb-4" type="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <br />
            <div className="d-flex justify-content-center align-items-center mb-4">
              <Button className="custom-button rounded-pill fw-bold mb-3" type="submit">SignUp</Button>
            </div>
          </form>
          <h3 className="text-center text-secondary">Do have an account already? <a className="fw-bold text-secondary" href="/login">Login</a></h3>

        </Container>
      </div>
    </div>
  )
}
