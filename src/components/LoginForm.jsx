import React, { useState, useEffect } from "react";
import axios from "axios";

// const tokenGlobal = token;
// const idGlobal = id;

export const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const url = 'https://bizoni-backend-apis.azurewebsites.net/api/v1/login';

  const [token, setToken] = useState("");
  const [id, setID] = useState("");

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
      const response = await axios.post(url, dataa, {headers: headers});
      console.log(response.data);
      setToken(response.data.access_token);
      setID(response.data.user_id);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  // handleSubmit();
  // },[token]);

  useEffect(() => {
    console.log(token);
    console.log(id)
  }, [token, id]);

  sessionStorage.setItem('token', token);

  sessionStorage.setItem('id', id);

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
    </>
  )
}