import React, { useState, useEffect } from "react";
import axios from "axios";
// import { App } from '../App'


export const DataFetch = () => {
  const [userData, setUserData] = useState(null);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJib3Nhc2RkYXNzMTIzNEBnbWFpbC5jb20iLCJleHAiOjE2NzgxMTI1MTF9.pkEEKH6aY9emP1z9qJJbDgUljHKad0TydJc1KqBaesw';
  const headers = { Authorization: `Bearer ${token}` };
  const url = "https://bizoni-backend-apis.azurewebsites.net/api/v1/users/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataa = {
        "name": "Cont Smaaddasasd",
        "email": "bosas234@gmail.com",
        "password": password,
        "account_type": "individual",
        "address": "7353 South St. Braintree, MA 051843123"
      }
      const response = await axios.post(url, dataa);
      console.log(response.data); // Handle successful login
      console.log(dataa)
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" onClick={() => {}}>Login</button>
      </form>
    </div>
  );
}

