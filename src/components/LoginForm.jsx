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
      const dataa = {
        "email": email,
        "password": password
      }
      const response = await axios.post(url, dataa);
      console.log(response.data);
      console.log(dataa);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <><div class="container">
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div class="form-group py-2">
          <label>
            <h3 class="text-center text-secondary">Email</h3>
          </label>
          <input class="form-control form-control-sm mx-auto" id="inputEmail" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div class="form-group py-2">
          <label>
            <h3 class="text-center text-secondary">Password</h3>
          </label>
          <input class="form-control form-control-sm mx-auto" id="inputPassword" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <br />
        <div className="d-flex justify-content-center align-items-center b-0">
          <button class="btn custom-button rounded-pill" type="submit" onClick={() => { } }>Login</button>
        </div>
      </form>
    </div>
    <p>
    </p></>
  )
}
