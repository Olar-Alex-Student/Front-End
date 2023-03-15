import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";


export const SignUpForm = () => {
  const url = "https://bizoni-backend-apis.azurewebsites.net/api/v1/users/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataa = {
        "name": name,
        "email": email,
        "password": password,
        "account_type": accountType,
        "address": address
      }
      const response = await axios.post(url, dataa);
      console.log(response.data); // Handle successful login
      console.log(dataa)
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="container">
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group py-2">
          <Form.Label>
            <h3 className="text-center text-secondary">Name</h3>
          </Form.Label>
          <Form.Control className="mb-3" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group py-2">
          <Form.Label>
            <h3 className="text-center text-secondary">Email</h3>
          </Form.Label>
          <Form.Control className="mb-3" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group py-2">
          <Form.Label>
            <h3 className="text-center text-secondary">Password</h3>
          </Form.Label>
          <Form.Control className="mb-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group py-2">
          <Form.Label>
            <h3 className="text-center text-secondary">Account Type</h3>
          </Form.Label>
            <br />
            <div className="input-group mb-3">
              <Form.Select className="mb-3" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                <option>Select an Option</option>
                <option>Individual</option>
                <option>Company</option>
                <option>Public Institution</option>
              </Form.Select>
            </div>
        </div>
        <div className="form-group py-2">
          <Form.Label>
            <h3 className="text-center text-secondary">Address</h3>
          </Form.Label>
          <Form.Control className="mb-3" type="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <br />
        <div className="d-flex justify-content-center align-items-center b-0">
          <Button className="custom-button rounded-pill fw-bold mb-3" type="submit">SignUp</Button>
        </div>
      </form>
      <h3 className="text-center text-secondary">Do have an account already? <a className="fw-bold text-secondary" href="/login">Login</a></h3>
    </div>
  )
}