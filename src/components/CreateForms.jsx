import React, { useState, useEffect } from 'react'
import logo from "../images/bison_logo.png"
import { Navbar, Nav, Button, Table, Container, Modal } from 'react-bootstrap';

export const CreateForms = () => {

  return (
    <>
      <div className="container d-flex justify-content-center p-4">
        <div className="box box-size-forms bg-primary p-5 d-flex justify-content-center align-items-center flex-column gap-5">
          <div className="title text-dark fw-bold">
            <span>Create Form</span>
          </div>
        </div>
      </div>
    </>
  )
}
