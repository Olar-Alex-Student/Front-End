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
        <br />
        <button class="text-center btn rounded-pill" type="submit" onClick={() => { } }>Login</button>
      </form>
    </div>
    <p>
    </p></>
  )
}