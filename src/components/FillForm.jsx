import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Button, Table, Container, Modal } from 'react-bootstrap';
import '../css/Forms.css'

export const FillForm = () => {
    return(
        <>
        <div className='container d-flex justify-content-center p-4'>
            <div className='box bg-primary p-5 d-flex justify-content-center align-items-center flex-column gap-5'>
                <div className='title d-flex justify-content-center text-secondary fw-bold p-4'>
                    Fill Form
                </div>
                <div className='container text-secondary'>
                    AREA1
                </div>
                <div className='container text-secondary'>
                    AREA2
                </div>
            </div>
        </div>
        </>
    )
}