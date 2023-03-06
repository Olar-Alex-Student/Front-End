import React, { useState, useEffect } from "react";
import axios from "axios";


export const DataFetch = () => {
  const [userData, setUserData] = useState(null);
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
    <div>
      <h1>Login Page</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
      <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Account Type:</label>
          <input type="text" value={accountType} onChange={(e) => setAccountType(e.target.value)} />
        </div>
        <div>
          <label>Address:</label>
          <input type="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <button type="submit" onClick={() => {}}>Login</button>
      </form>
    </div>
)
}