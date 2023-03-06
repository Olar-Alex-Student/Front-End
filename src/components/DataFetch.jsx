import React, { useState, useEffect } from "react";
import axios from "axios";

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
      const response = await axios.post(url, {
        "name": "Cont Smasddasecher",
        "email": "bosasddass1234@gmail.com",
        "password": "paasdadsrola",
        "account_type": "individual",
        "address": "7353 South St. Braintree, MA 05184"
      });
      console.log(response.data); // Handle successful login
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

