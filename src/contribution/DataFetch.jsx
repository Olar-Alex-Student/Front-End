import React, {useEffect, useState} from 'react'
import axios from 'axios'

function DataFetch() {
    const [post, setPost] = useState({})
    const [id, setID] = useState()
    const [idButton, setButton] = useState()

    const pressClick = () => {
        setButton(id)
    }

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${idButton}`)
            .then(res => {
                console.log(res)
                setPost(res.data)
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
                    post.title
                }
            </h2>
            <p>
                {
                    post.body
                }
            </p>
            {/* <ul>
                {
                    post.map(post => <li key={post.id}>{post.title}</li>)
                }
            </ul> */}
        </div>
    )
}

export default DataFetch