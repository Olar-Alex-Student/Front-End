import React, { useState } from 'react'
import logo from "../images/bison_logo.png"
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
                <Button href="/login" className="custom-button rounded-pill fw-bold">Login</Button>
                <Button href="/signup"className="custom-button rounded-pill fw-bold">Sign Up</Button>
              </div>
            </div>
          </div> : null
      }
    </>
  )
}
