import React, { useState, useEffect } from 'react'
import logo from "../images/bison_logo.png"
import { Navbar, Nav, Button, Table, Container, Modal, InputGroup, Form } from 'react-bootstrap';

export const CreateForms = () => {

  return (
    <>
      <div className="container d-flex justify-content-center p-4">
        <div className="box box-size-forms bg-primary p-5 d-flex justify-content-center align-items-center flex-column gap-5">
          <div className="title text-dark fw-bold">
            <span>Create Form</span>
          </div>
          <Container>
            <form className="row g-3 p-3 rounded-5 bg-secondary">
              <div class="col-6 mb-3">
                <label for="InputTitle" class="form-label">Title</label>
                <input type="email" class="form-control" id="InputTitle" placeholder="Title" />
              </div>
              <div class="col-6 mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <div className="col-12">
                <div className='d-flex align-items-center justify-content-center'>
                  <Button type="submit" className='custom-button custom-button-inverted medium-button-size rounded-pill fw-bold'>Create!</Button>
                </div>
              </div>
            </form>
          </Container>
        </div>
      </div>
    </>
  )
}
