import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const CreateUser = () => {
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

  const postData = async () => {
    try {
      await axios.post(`${CORS_PROXY}https://bizoni-backend-apis.azurewebsites.net/api/v1/users`, data);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (data.name && data.email && data.password) {
      postData();
    }
  }, [data]);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.name && data.email && data.password) {
      setError(null);
      setSuccess(false);
      postData();
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      {success && <div>Success! Data sent to server.</div>}
      <label>
        Name:
        <input type="text" name="name" value={data.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={data.email} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={data.password} onChange={handleChange} />
      </label>
      <button type="submit">Send Data</button>
    </form>
  );
}