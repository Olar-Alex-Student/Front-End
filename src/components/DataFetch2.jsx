import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';

export const DataFetch2 = () => {
  const [userData, setUserData] = useState(null);
  const apiUrl = "https://bizoni-backend-apis.azurewebsites.net/api/v1/users/98e05988-d296-4551-b71d-815c89f75563";
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJib3Nhc2RkYXNzMTIzNEBnbWFpbC5jb20iLCJleHAiOjE2NzgxMTI1MTF9.pkEEKH6aY9emP1z9qJJbDgUljHKad0TydJc1KqBaesw';
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios
      .get(
        apiUrl,
        { headers }
      )
      .then((response) => setUserData(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h2>{userData.name}</h2>
          <p>{userData.email}</p>
          <p>{userData.phone}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

