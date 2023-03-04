import { useState } from 'react'
import logo from "./images/bison_logo.png"
import './css/App.css'
import { Navbar, Nav, Button } from 'react-bootstrap';
import DataFetch from './contribution/DataFetch';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className="container p-3">
        <ul className="nav nav-fill rounded-5 bg-primary">
          <li className="nav-item">
            <a href="" className="nav-link fw-bold text-light">
              <img src={logo} width="50" height="50"
                className="rounded-pill d-inline-block align-top" alt="" />
                Bizonii
            </a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link text-light active">Home</a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link text-light">History</a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link text-light">Forms</a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link text-light">Upgrade</a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link text-light">Login</a>
          </li>
        </ul>
      </div>
      <div className="container">
        <div className="d-flex justify-content-center align-content-center p-4">
          <div className="box bg-primary p-5 d-flex justify-content-center align-items-center flex-column gap-5 hide">
            <div className="title">
              <button type="button" className="toggler toggle" onclick="toggle()">
                <img src={logo} width="150" height="150"
                  className="toggler-image rounded-pill" alt="" />
              </button>
              <span className="toggle fw-bold hide">Forms</span>
            </div>
            <h4 className="toggle text-center text-secondary hide">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
              similique nihil, soluta nulla ratione minus modi nostrum dicta illo obcaecati, necessitatibus rem,
              odit voluptate. Quod, consequatur repellat! Eligendi, et numquam!</h4>
            <div className="toggle buttons d-flex gap-5 hide">
              <button type="button" className="btn rounded-pill btn-secondary fw-bold">Login</button>
              <button type="button" className="btn rounded-pill btn-secondary fw-bold">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      <DataFetch/>
    </div>
  )
}

export default App
