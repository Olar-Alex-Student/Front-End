import React, { useState, useEffect } from "react";
import axios from "axios";


export const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const url = 'https://bizoni-backend-apis.azurewebsites.net/api/v1/login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
      const dataa = {
        "username": email,
        "password": password,
        "grant_type": "",
        "scope": "",
        "client_id": "",
        "client_secret": ""
      }
      // console.log(headers);
      // console.log(dataa);
      const response = await axios.post(url, dataa, headers);
      console.log(response.data);
      // console.log(dataa);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <><div className="container">
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group py-2">
          <label>
            <h3 className="text-center text-secondary">Email</h3>
          </label>
          <input className="form-control form-control-sm mx-auto" id="inputEmail" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group py-2">
          <label>
            <h3 className="text-center text-secondary">Password</h3>
          </label>
          <input className="form-control form-control-sm mx-auto" id="inputPassword" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <br />
        <div className="d-flex justify-content-center align-items-center b-0">
          <button className="btn custom-button rounded-pill" type="submit" onClick={() => { } }>Login</button>
        </div>
      </form>
    </div>
    <p>
    </p></>
  )
}
