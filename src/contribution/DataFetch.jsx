/*import React, {useEffect, useState} from 'react'
import axios from 'axios'

function DataFetch() {
    const [post, setPost] = useState({})
    const [id, setID] = useState()
    const [idButton, setButton] = useState()
    const [user, setUser] = useState({})

    const pressClick = () => {
        setButton(id)
    }

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwb2dnZXJzMTIzNEBwb2dtYWlsLmNvbSIsImV4cCI6MTY3Nzk0NzUwOX0.fRzSWgr8iHw2IktDYmsGzU23Q4jHLUztVhDGOhURyb4"
        }
    };
    

    useEffect(() => {
        console.log(idButton)
        axios.get(`https://bizoni-backend-apis.azurewebsites.net/api/v1/users/${idButton}`,config)
            .then(res => {
                console.log(res)
                setUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [idButton])
    return(
        <div>
            <h1>
                Introdu Id-ul:
            </h1>
            <input type="text" value={id} onChange={e => setID(e.target.value)}/>
            <button type='button' onClick={pressClick}>Request API</button>
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
            {/* <ul>
                {
                    post.map(post => <li key={post.id}>{post.title}</li>)
                }
            </ul> *}
        </div>
    )
}

export default DataFetch*/
/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://bizoni-backend-apis.azurewebsites.net/api/v1/users/c6c1b8ae-44cd-4e83-a5f9-d6bbc8eeebcf';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwb2dnZXJzMTIzNEBwb2dtYWlsLmNvbSIsImV4cCI6MTY3Nzk0NzUwOX0.fRzSWgr8iHw2IktDYmsGzU23Q4jHLUztVhDGOhURyb4';

function DataFetch() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      console.log("response1")
      try {
        const response = await axios.get(`${API_URL}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`
          }
        });
        setData(response.data);
        console.log("response2")
        setError(null);
      } catch (error) {
        setError(error);
        setData(null);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : data ? (
        <ul>
          {data.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
}

export default DataFetch;
*/
import axios from 'axios';
import { useEffect, useState } from 'react';

function DataFetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://bizoni-backend-apis.azurewebsites.net/api/v1/users/c6c1b8ae-44cd-4e83-a5f9-d6bbc8eeebcf', {
          headers: {
            Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwb2dnZXJzMTIzNEBwb2dtYWlsLmNvbSIsImV4cCI6MTY3Nzk0NzUwOX0.fRzSWgr8iHw2IktDYmsGzU23Q4jHLUztVhDGOhURyb4',
          },
        });
        setData(response.data);
        console.log("Data is fetch")
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return <div>{useReducer.name}</div>;
}

export default DataFetch;

