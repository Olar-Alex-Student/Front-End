import React, { useState } from 'react'
import logo from "../images/bison_logo_circle.png"
import { Navbar, Nav, Button } from 'react-bootstrap';

export const Home = () => {
  const [toggle, setToggle] = useState(true)

  return (
    <>
      {
        toggle ?
          <div className="container-toggle-button">
            <button type="button" className="toggle-button" onClick={() => { setToggle(false) }}>
              <img src={logo} width="150" height="150"
                className="toggler-image" alt="" />
            </button>
          </div> : null
      }
      {
        !toggle ?
          <div className="component-container container d-flex justify-content-center">
            <div className="box bg-primary d-flex justify-content-center align-items-center flex-column gap-5">
              <div className="title text center text-secondary fw-bold">
                <span>Bizonii</span>
              </div>
              <p className="text-center text-secondary fs-5">Descopera cea mai buna metoda de a iti completa un formular in doar cateva minute! Da este chiar atat de simplu!</p>
              {
                (sessionStorage.getItem('loggedin') == 'true') ?
                  <div className="buttons d-flex gap-5">
                    <Button href="/forms/create" className="custom-button rounded-pill fw-bold">Create</Button>
                    <Button href="/forms" className="custom-button rounded-pill fw-bold">Browse</Button>
                  </div>
                  :
                  <div className="buttons d-flex gap-5">
                    <Button href="/login" className="custom-button rounded-pill fw-bold">Login</Button>
                    <Button href="/signup" className="custom-button rounded-pill fw-bold">Sign Up</Button>
                  </div>
              }
            </div>
          </div> : null
      }
    </>
  )
}
