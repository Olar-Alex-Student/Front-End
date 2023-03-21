import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./images/bison_logo_circle.png"
import './css/App.css'
import { Navbar, Nav, Button, Container, Form, Modal } from 'react-bootstrap';
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
import { FormRecognizer } from "./components/FormRecognizer";

function App() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkLoggedIn = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const id = sessionStorage.getItem('id');
      const url = `https://bizoni-backend-apis.azurewebsites.net/api/v1/users/${id}`;
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(url, { headers: headers });
      console.log(response.data);
      sessionStorage.setItem('loggedin', 'true');
      console.log('logged in')
    } catch (error) {
      console.log('error', error);
      // console.log(error.response.data.detail)
      sessionStorage.setItem('loggedin', 'false');
      console.log('not logged in')
    }
  };

  const logOut = () => {
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('id', '');
    sessionStorage.setItem('loggedin', 'false');
    window.location.reload(false);
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      checkLoggedIn()
    }
    return () => { ignore = true; }
  }, []);

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
                  <Nav.Link as={Link} to={'/forms/create'} className='text-secondary rounded-pill'>Create</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link as={Link} to={'/forms'} className='text-secondary rounded-pill'>Browse</Nav.Link>
                </Nav.Item>

                {/* <Nav.Item>
                  <Nav.Link as={Link} to={'/upgrade'} className='text-secondary rounded-pill'>Upgrade</Nav.Link>
                </Nav.Item> */}

                {(sessionStorage.getItem('loggedin') == 'true') ?
                  <Nav.Item>
                    <Nav.Link as={Link} onClick={(e) => { handleShow() }} className='text-secondary rounded-pill'>Sign Out</Nav.Link>
                  </Nav.Item>
                  :
                  <Nav.Item>
                    <Nav.Link as={Link} to={'/login'} className='text-secondary rounded-pill'>Login</Nav.Link>
                  </Nav.Item>
                }
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
            <Route path='fill/:form_id_url' element={<FillForm />} />
            <Route path='form-recognizer' element={<FormRecognizer />} />
            <Route path='edit' element={<CreateForms />} />
            <Route path='edit/:form_id_url' element={<CreateForms />} />
          </Route>
          <Route path='/upgrade' element={<Upgrade />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<> <Signup /> </>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you want to sign out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Changed my mind
          </Button>
          <Button variant="primary" onClick={(e) => { handleClose(e); logOut() }}>
            Sign Out!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default App
