import React, { useState, useEffect } from "react";
import axios from "axios";


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
    <div class="container">
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label>
            <h4 class="text-center">Name</h4>
          </label>
          <input class="form-control form-control-sm mx-auto" id="inputName" placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div class="form-group">
          <label>
            <h4 class="text-center">Email</h4>
          </label>
          <input class="form-control form-control-sm mx-auto" id="inputEmail" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div class="form-group">
          <label>
            <h4 class="text-center">Password</h4>
          </label>
          <input class="form-control form-control-sm mx-auto" id="inputPassword" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div class="form-group">
          <label>
            <h4 class="text-center">Account Type</h4>
          </label>
          <input class="form-control form-control-sm mx-auto" id="inputAccountType" placeholder="Account Type" type="text" value={accountType} onChange={(e) => setAccountType(e.target.value)} />
        </div>
        <div class="form-group">
          <label>
            <h4 class="text-center">Address</h4>
          </label>
          <input class="form-control form-control-sm mx-auto" id="inputaddress" placeholder="Address" type="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <br />
        <button class="text-center btn rounded-pill" type="submit" onClick={() => { } }>SignUp</button>
      </form>
    </div>
  )
}