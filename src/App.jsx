import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./images/bison_logo_circle.png"
import './css/App.css'
import { Navbar, Nav, Button, Container, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link, RouterProvider } from 'react-router-dom';
import { Home } from './components/Home'
import { History } from './components/History'
import { Forms } from './components/Forms'
import { Upgrade } from './components/Upgrade'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { NotFound } from "./components/NotFound";
import { CreateForms } from "./components/CreateForms";
import { FillForm } from "./components/FillForm";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar expand="lg">
          <Container className="container-nav rounded-pill bg-primary">
            <Navbar.Toggle aria-controls="navbar-collapse-id" />
            <Navbar.Collapse id="navbar-collapse-id">
              <Nav className="nav-fill justify-content-around flex-grow-1">
                <Nav.Item>
                  <Nav.Link as={Link} to={'/'} className='text-secondary rounded-pill fw-bold'>
                    <img src={logo} width="46" height="46"
                      className="d-inline-block align-top mx-2" alt="" />
                    Bizonii
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link as={Link} to={'/create'} className='text-secondary rounded-pill'>Create</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link as={Link} to={'/forms'} className='text-secondary rounded-pill'>Browse</Nav.Link>
                </Nav.Item>

                {/* <Nav.Item>
                  <Nav.Link as={Link} to={'/upgrade'} className='text-secondary rounded-pill'>Upgrade</Nav.Link>
                </Nav.Item> */}

                <Nav.Item>
                  <Nav.Link as={Link} to={'/login'} className='text-secondary rounded-pill'>Login</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/history' element={<History />} />
          <Route path='/forms'>
            <Route index element={<Forms />} />
            <Route path='create' element={<CreateForms />} />
            <Route path='fill/*' element={<FillForm />} />
            <Route path='edit' element={<CreateForms />} />
            <Route path='edit/:edit_id' element={<CreateForms />} />
          </Route>
          <Route path='/upgrade' element={<Upgrade />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<> <Signup /> </>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter >
    </div>
  )
}

export default App
