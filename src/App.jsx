import React, { useState } from 'react'
import logo from "./images/bison_logo.png"
import './css/App.css'
import './App.css'
import { Navbar, Nav, Button } from 'react-bootstrap';

function App() {
  const [toggle, setToggle] = useState(true)

  return (
    <div className="App">
      <div className="container">
        <Nav variant='pills' className="nav-fill rounded-pill bg-primary">
          <Nav.Item>
            <Nav.Link href="#" className='text-secondary rounded-pill fw-bold'>
              <img src={logo} width="46" height="46"
                className="rounded-pill d-inline-block align-top mx-2" alt="" />
              Bizonii</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/home" className='text-secondary rounded-pill'>Home</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/history" className='text-secondary rounded-pill'>History</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/forms" className='text-secondary rounded-pill'>Forms</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/upgrade" className='text-secondary rounded-pill'>Upgrade</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/login" className='text-secondary rounded-pill'>Login</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      {
        toggle ?
          <div className="container-toggle-button">
            <button type="button" className="toggle-button" onClick={() => { setToggle(false) }}>
              <img src={logo} width="150" height="150"
                className="toggler-image rounded-pill" alt="" />
            </button>
          </div> : null
      }
      {
        !toggle ?
          <div className="container d-flex justify-content-center p-4">
            <div className="box bg-primary p-5 d-flex justify-content-center align-items-center flex-column gap-5">
              <div className="title text-dark fw-bold">
                <span>Forms</span>
              </div>
              <p className="text-center text-secondary fs-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
                similique nihil, soluta nulla ratione minus modi nostrum dicta illo obcaecati, necessitatibus rem,
                odit voluptate. Quod, consequatur repellat! Eligendi, et numquam!</p>
              <div className="buttons d-flex gap-5">
                <Button className="rounded-pill fw-bold">Login</Button>
                <Button className="rounded-pill fw-bold">Sign Up</Button>
              </div>
            </div>
          </div> : null
      }
    </div>
  )
}

export default App
