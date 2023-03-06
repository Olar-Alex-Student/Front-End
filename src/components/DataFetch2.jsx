import React, { useState, useEffect } from "react";
import axios from "axios";

export const DataFetch2 = () => {
  const [userData, setUserData] = useState(null);
  const apiUrl = "https://bizoni-backend-apis.azurewebsites.net/api/v1/users/e55da967-4a3d-455f-a893-e4f43fc02dea";
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb2FzZGFzZ3JlZGdyZWZkZ2VyZmRvc3NsQGdtYWlsLmNvbSIsImV4cCI6MTY3ODExMDQyMH0.X88NM_XO7CQUXcnoBVYrJaPKRiLSrWCs7OlIt0NolwI';
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

