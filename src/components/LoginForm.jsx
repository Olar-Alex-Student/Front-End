import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// const tokenGlobal = token;
// const idGlobal = id;

export const LoginForm = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const url = 'https://bizoni-backend-apis.azurewebsites.net/api/v1/login';

  // useEffect(() => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      const dataa = {
        username: email,
        password: password
      }
      const response = await axios.post(url, dataa, { headers: headers });
      console.log(response.data);
      console.log(response.data.access_token);
      console.log(response.data.user_id);
      sessionStorage.setItem('token', response.data.access_token);
      sessionStorage.setItem('id', response.data.user_id);
      navigate("/");
      alert("Login Success!");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="container">
      {error && <div>{error}</div>}
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
    </div>
  );
}