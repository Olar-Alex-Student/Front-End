import React, { useState, useEffect } from "react";
import axios from "axios";

export const DataFetch = () => {
  const [userData, setUserData] = useState(null);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZXJkc2FmZXJhZHNlcmFkQHBvZ21haWwuY29tIiwiZXhwIjoxNjc4MDQ2NTE2fQ.vMLZM5SmbtwicWyM9VJ7eYZLO_xx_StbWSiF8LupglU';
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios
      .get(
        "https://bizoni-backend-apis.azurewebsites.net/api/v1/users/e68ce6d0-a595-4312-b088-22c7a6282d73",
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

