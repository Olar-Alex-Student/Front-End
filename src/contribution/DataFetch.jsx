import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const id = "e68ce6d0-a595-4312-b088-22c7a6282d73";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZXJkc2FmZXJhZHNlcmFkQHBvZ21haWwuY29tIiwiZXhwIjoxNjc4MDQ2NTE2fQ.vMLZM5SmbtwicWyM9VJ7eYZLO_xx_StbWSiF8LupglU";  

function DataFetch() {
  const [user, setUser] = useState({})

  useEffect(() => {
    const config = {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": `${CORS_PROXY}`,
        "X-Requested-With": "XMLHttpRequest"
       }
    };
    axios.get(`https://cors-anywhere.herokuapp.com/https://bizoni-backend-apis.azurewebsites.net/api/v1/users/${id}`,config)
        .then(res => {
            console.log(res)
            setUser(res.data)
        })
        .catch(err => {
            console.log(err)
        })
}, [id, token])
return(
    <div>
        <h2>
            {
                user.nume
            }
        </h2>
        <p>
            {
                user.email
            }
        </p>
    </div>
)
}

export default DataFetch;