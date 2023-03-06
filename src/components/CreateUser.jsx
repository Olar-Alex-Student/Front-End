import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const CreateUser = () => {
  const [data, setData] = useState({ name: '', email: '', password: '', account_type: '',
  address: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);



  const postData = async () => {
    try {
      await axios.post(`https://bizoni-backend-apis.azurewebsites.net/api/v1/users`, {
  "name": "Vizitiu Valentinaaa",
  "email": "poggers1234@pogmail.comaaaa",
  "password": "1234aaaa",
  "account_type": "individual",
  "address": "7353 South St. Braintree, MA 02184aaaa"
});
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
    if (data.name && data.email && data.password && data.account_type && data.address) {
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
      <label>
        Acc Type:
        <input type="text" name="account_type" value={data.account_type} onChange={handleChange} />
      </label>
      <label>
        Address:
        <input type="text" name="address" value={data.address} onChange={handleChange} />
      </label>
      <button type="submit">Send Data</button>
    </form>
  );
}