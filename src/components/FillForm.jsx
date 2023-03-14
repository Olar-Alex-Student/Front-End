import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Navbar, Nav, Button, Table, Container, Modal, InputGroup, Form, ListGroup, Tab } from 'react-bootstrap';
import axios from "axios";
import JoditEditor from 'jodit-react';

export const FillForm = () => {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cnp, setCNP] = useState("");
    const [location, setLocation] = useState("");
    const [street, setStreet] = useState("");
    const [nr, setNr] = useState("");
    const [block, setBlock] = useState("");
    const [stair, setStair] = useState("");
    const [floor, setFloor] = useState("");
    const [ap, setAp] = useState("");
    const [county, setCounty] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
    <>
    <div className=" container d-flex justify-content-center p-4">
        <div className="box box-size-forms bg-primary p-5 d-flex justify-content-center align-items-center flex-column gap-5">
            <div className="title text-secondary fw-bold">
                <span>Fill Form</span>
            </div>
            <Container>
                <form onSubmit={handleSubmit}>
                    <form className="row g-3 p-3 rounded-5 bg-secondary">
                        <div className="col-lg-12 mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control className="mb-3" type="text" placeholder="Name" onChange={(e) => { setName(e.target.value) }} />
                            
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control className="mb-3" type="text" placeholder="Last Name" onChange={(e) => { setLastName(e.target.value) }} />
                            
                            <Form.Label>CNP</Form.Label>
                            <Form.Control className="mb-3" type="number" placeholder="CNP" onChange={(e) => { setCNP(e.target.value) }} />
                            
                            <Form.Label>Localitate</Form.Label>
                            <Form.Control className="mb-3" type="text" placeholder="Localitate" onChange={(e) => { setLocation(e.target.value) }} />
                            
                            <Form.Label>Strada</Form.Label>
                            <Form.Control className="mb-3" type="text" placeholder="Street" onChange={(e) => { setStreet(e.target.value) }} />
                            
                            <Form.Label>Nr.</Form.Label>
                            <Form.Control className="mb-3" type="number" placeholder="Nr" onChange={(e) => { setNr(e.target.value) }} />
                            
                            <Form.Label>Bloc</Form.Label>
                            <Form.Control className="mb-3" type="number" placeholder="Block" onChange={(e) => { setBlock(e.target.value) }} />
                            
                            <Form.Label>Scara</Form.Label>
                            <Form.Control className="mb-3" type="number" placeholder="Stair" onChange={(e) => { setStair(e.target.value) }} />
                            
                            <Form.Label>Etaj</Form.Label>
                            <Form.Control className="mb-3" type="number" placeholder="Floor" onChange={(e) => { setFloor(e.target.value) }} />
                            
                            <Form.Label>Apartament</Form.Label>
                            <Form.Control className="mb-3" type="number" placeholder="Ap" onChange={(e) => { setAp(e.target.value) }} />
                            
                            <Form.Label>Judet</Form.Label>
                            <Form.Select className="mb-3" value={county} onChange={(e) => setCounty(e.target.value)} defaultValue="none">
                            {/* <option>Scan document type</option> */}
                                <option value="none">None</option>
                                <option value="Suceava">Suceava</option>
                                <option value="Botosani">Botosani</option>
                                <option value="Neamt">Neamt</option>
                                <option value="Maramures">Maramures</option>
                                <option value="Bistrita">Bistrita</option>
                                <option value="Mures">Mures</option>
                                <option value="Harghita">Harghita</option>
                            </Form.Select>

                            <Form.Label>Email</Form.Label>
                            <Form.Control className="mb-3" type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />

                            <Form.Label>Telefon</Form.Label>
                            <Form.Control className="mb-3" type="number" placeholder="Phone" onChange={(e) => { setPhone(e.target.value) }} />
                        </div>
                    </form>
                    <br/>
                    <form className="row g-3 p-3 rounded-5 bg-secondary">
                        <div className="col-lg-12 mb-3">
                            <div className="text-dark fw-bold">
                                <h1>Form</h1>
                            </div>
                            <br/>
                            <div className="container">
                                <h4>
                                    {name} {lastName}, cu CNP-ul: {cnp}. Cu domiciliul in {location}, judetul {county}, pe strada {street}, numarul {nr}, blocul {block}, scara {stair}, etajul {floor}, apartamentul {ap}.
                                    Poate fi gasit la nr. de telefon: {phone} si e-mail: {email}.
                                </h4>
                            </div>
                        </div>
                    </form>

                </form>
            </Container>
        </div>
    </div>
    </>
    )
}
