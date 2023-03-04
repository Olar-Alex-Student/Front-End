import React, { useState } from 'react'
import logo from "./images/bison_logo.png"
import './css/App.css'
import './App.css'
import { Navbar, Nav, Button } from 'react-bootstrap';

function App() {
  const [toggle, setToggle] = useState(true)

  return (
    <div className="App">
      {
        toggle ?
          <div className="container-toggle-button">
            <button type="button" className="toggle-button" onClick={() => { setToggle(false) }}>
              <img src={logo} width="150" height="150"
                className="toggler-image rounded-pill" alt="" />
            </button>
          </div> : null
      }
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
      {
        !toggle ?
      <div className="container">
        <div className="d-flex justify-content-center align-content-center p-4">
          <div className="box bg-primary p-5 d-flex justify-content-center align-items-center flex-column gap-5 hide">
            <div className="title">

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
      </div> : null
      }
    </div>
  )
}

export default App
