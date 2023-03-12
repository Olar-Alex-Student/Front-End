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
    <div className="container">
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group py-2">
          <label>
            <h3 className="text-center text-secondary">Name</h3>
          </label>
          <input className="form-control form-control-sm mx-auto" id="inputName" placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
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
        <div className="form-group py-2">
          <label>
            <h3 className="text-center text-secondary">Account Type</h3>
          </label>
          {/* <input class="form-control form-control-sm mx-auto" id="inputAccountType" placeholder="Account Type" type="text" value={accountType} onChange={(e) => setAccountType(e.target.value)} /> */}
            <br />
            <div className="input-group mb-3">
              <select className="form-select" aria-label="Default select example">
                <option>Select an Option</option>
                <option value={accountType} onChange={(e) => setAccountType(e.target.value)}>Individual</option>
                <option value={accountType} onChange={(e) => setAccountType(e.target.value)}>Company</option>
                <option value={accountType} onChange={(e) => setAccountType(e.target.value)}>Public Institution</option>
              </select>
            </div>
        </div>
        <div className="form-group py-2">
          <label>
            <h3 className="text-center text-secondary">Address</h3>
          </label>
          <input className="form-control form-control-sm mx-auto" id="inputaddress" placeholder="Address" type="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <br />
        <div className="d-flex justify-content-center align-items-center b-0">
          <button className="btn custom-button rounded-pill" type="submit" onClick={() => { } }>SignUp</button>
        </div>
      </form>
    </div>
  )
}