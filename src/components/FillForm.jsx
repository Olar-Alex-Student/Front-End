import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Navbar, Nav, Button, Table, Container, Modal, InputGroup, Form, ListGroup, Tab, Alert } from 'react-bootstrap';
import axios from "axios";
import JoditEditor from 'jodit-react';
import { useNavigate } from "react-router-dom";

export const FillForm = () => {
    const { form_id_url } = useParams()

    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const handleCloseError = () => setShowError(false);
    const handleShowError = () => setShowError(true);

    const [values, setValues] = useState({});

    const [title, setTitle] = useState('');
    const [dynamic_fields, setDynamicFields] = useState([]);
    const [sections, setSections] = useState([]);
    const [sectionsDisplay, setSectionsDisplay] = useState([]);

    function valueChange(event, id) {
        setSectionsDisplay(sections)
        Object.keys(values).forEach((key, index) => {
            if (key == id) {
                const updatedValues = values
                updatedValues[key] = event.target.value
                setValues(updatedValues);
                console.log('valueChange', updatedValues)
            }
        });
        const updatedSections = JSON.parse(JSON.stringify(sectionsDisplay));
        sections.forEach((element, index) => {
            let newText = element['text']
            Object.keys(values).forEach((key, index_value) => {
                if (values[key] != '' && newText.includes(`{${key}}`)) {
                    newText = newText.replace(`{${key}}`, values[key])
                    updatedSections[index]['text'] = newText
                    setSectionsDisplay(updatedSections);
                }
            });
        })
    }

    function handleValues(dynamic_fields_response) {
        const newValues = {};
        dynamic_fields_response.forEach(field => {
            newValues[field.placeholder] = '';
        });
        setValues(newValues)
        console.log(newValues)
    }

    async function handleGet() {
        const token = sessionStorage.getItem('token');
        const id = sessionStorage.getItem('id');
        const url = `https://bizoni-backend-apis.azurewebsites.net/api/v1/users/${id}/forms/${form_id_url}`;
        const headers = { Authorization: `Bearer ${token}` };

        try {
            const response = await axios.get(url, { headers: headers });
            console.log(response.data); // Handle successful login
            setTitle(response.data.title)
            setDynamicFields(response.data.dynamic_fields)
            handleValues(response.data.dynamic_fields)
            setSections(response.data.sections)
            setSectionsDisplay(response.data.sections)
        } catch (error) {
            console.log('error', error); // error.response.data.message
            setError(error.response.data.detail)
            handleShowError()
        }
    };

    useEffect(() => {
        let ignore = false;

        if (!ignore) handleGet()

        return () => { ignore = true; }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem('token');
        const id = sessionStorage.getItem('id');
        const url = `https://bizoni-backend-apis.azurewebsites.net/api/v1/users/${id}/forms/${form_id_url}/submissions/`;

        const output_data = {
            "completed_dynamic_fields": values
        }

        console.log(output_data);
        try {
            const response = await axios.post(url, output_data);
            console.log(response.data); // Handle successful login
            alert("Fill Form Done!");
            navigate("/");
        } catch (error) {
            console.log('error', error);
            setError(error.response.data.detail)
            handleShowError()
        }
    }

    return (
        <>
            <div className="container d-flex justify-content-center flex-column align-items-center p-4">
                {showError ?
                    <Alert className='sticky-top' variant="danger" onClose={() => setShowError(false)} dismissible>
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        {(typeof error == 'string') ?
                            <p>{error}</p> : <p>Please fill all the fields.</p>
                        }
                    </Alert>
                    : null}
                <div className="box box-size-forms bg-primary p-5 d-flex justify-content-center align-items-center flex-column gap-5">
                    <div className="title text-secondary fw-bold">
                        <span>Fill Form</span>
                    </div>
                    <Container>
                        <div onSubmit={handleSubmit}>
                            <form className="row g-3 p-3 rounded-5 bg-secondary">
                                <div className="col-lg-12 mb-3 d-flex flex-row align-items-end">
                                    <span className='fs-1'>Form: <strong>{title}</strong></span>
                                </div>
                                <div className="col-lg-6 mb-3">
                                    {dynamic_fields.map((element, index) => (
                                        <>
                                            {/* <ListGroup.Item key={index} action onClick={(event) => { loadDynamicField(event, index); setSelectedDynamic_field(index) }}>{element['label']}</ListGroup.Item> */}
                                            <Form.Label>{element['label']}</Form.Label>
                                            {element['type'] == 'single-choice' ?
                                                <Form.Select key={element['placeholder']} className="mb-3" onChange={(event) => valueChange(event, element['placeholder'])}>
                                                    <option>Select an option</option>
                                                    {element['options'].map((option, index) => (
                                                        <option value={option}>{option}</option>
                                                    ))}
                                                </Form.Select>
                                                : <Form.Control key={element['placeholder']} className="mb-3" type={element['type']} placeholder={element['label']} onChange={(event) => valueChange(event, element['placeholder'])} />
                                            }
                                        </>
                                    ))}

                                </div>
                                <div className="col-lg-6 mb-3 bg-white rounded-2 border border-danger-subtle">
                                    {sectionsDisplay.map((element, index) => (
                                        <p>{element['text']}</p>
                                    ))}
                                </div>
                                <div className="col-lg-12">
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <Button className='custom-button custom-button-inverted medium-button-size rounded-pill fw-bold' onClick={(e) => handleSubmit(e)}>Fill Form</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    )
}
