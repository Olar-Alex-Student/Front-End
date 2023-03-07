import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./images/bison_logo.png"
import './css/App.css'
import { Navbar, Nav, Button, Container, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link, RouterProvider } from 'react-router-dom';
import { Home } from './components/Home'
import { History } from './components/History'
import { Forms } from './components/Forms'
import { Upgrade } from './components/Upgrade'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
<<<<<<< HEAD
import { DataFetch } from './components/DataFetch'
<<<<<<< Updated upstream
import { DataFetch2 } from './components/DataFetch2'
=======
import { CreateUser } from "./components/CreateUser";
import { NotFound } from "./components/notFound";
=======
import { SignUpForm } from './components/SignUpForm'
import { LoginForm } from "./components/LoginForm";
>>>>>>> 619b5b774e5de80e27bc1959dc5e60c3b1435234
>>>>>>> Stashed changes

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Container>
          <Nav variant='pills' className="nav-fill rounded-pill bg-primary">
            <Nav.Item>
              <Nav.Link as={Link} to={'/'} className='text-secondary rounded-pill fw-bold disabled'>
                <img src={logo} width="46" height="46"
                  className="rounded-pill d-inline-block align-top mx-2" alt="" />
                Bizonii</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to={'/'} className='text-secondary rounded-pill'>Home</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to={'/history'} className='text-secondary rounded-pill'>History</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to={'/forms'} className='text-secondary rounded-pill'>Forms</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to={'/upgrade'} className='text-secondary rounded-pill'>Upgrade</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to={'/login'} className='text-secondary rounded-pill'>Login</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
        <Routes>
<<<<<<< HEAD
          <Route path='/' element={<Home />}>
          </Route>
          <Route path='/history' element={<History />}>
          </Route>
          <Route path='/forms' element={<Forms />}>
          </Route>
          <Route path='/upgrade' element={<Upgrade />}>
          </Route>
          <Route path='/login' element={<Login />}>
          </Route>
          <Route path='/signup' element={<> <Signup /> <CreateUser /> </>}>
          </Route>
          <Route path="*" element={<NotFound />}>
          </Route>
=======
          <Route path='/' element={<Home />}></Route>
          <Route path='/history' element={<History />}></Route>
<<<<<<< Updated upstream
          <Route path='/forms' element={<> <Forms /> <DataFetch /> <DataFetch2 /> </>}></Route>
          <Route path='/upgrade' element={<Upgrade />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
=======
          <Route path='/forms' element={<> <Forms /> </>}></Route>
          <Route path='/upgrade' element={<Upgrade />}></Route>
          <Route path='/login' element={<><Login /> <LoginForm/> </>}></Route>
          <Route path='/signup' element={<> <Signup /> <SignUpForm /> </>}></Route>
>>>>>>> 619b5b774e5de80e27bc1959dc5e60c3b1435234
>>>>>>> Stashed changes
        </Routes>
      </BrowserRouter >
    </div>
  )
}

export default App
