import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Button, Table, Container, Modal, InputGroup, Form, ListGroup, Tab } from 'react-bootstrap';
import axios from "axios";

export const CreateForms = () => {

  const url = "https://bizoni-backend-apis.azurewebsites.net/api/v1/users/f903e408-5664-4aba-8b37-20f3c2a49725/forms";
  const [error, setError] = useState("");

  const [dynamic_fields, setDynamicFields] = useState({
    'Nume': {
      'placeholder': 'nume',
      'type': 'text',
      'mandatory': true,
      'keywords': 'Nume, Last name',
      'options': ''
    },
    'Prenume': {
      'placeholder': 'prenume',
      'type': 'text',
      'mandatory': true,
      'keywords': 'Prenume, First name',
      'options': ''
    },
    'CNP': {
      'placeholder': 'cnp',
      'type': 'text',
      'mandatory': true,
      'keywords': 'CNP, Social Number',
      'options': ''
    }
  });

  const [oldLabel, setOldLabel] = useState('')
  const [label, setLabel] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const [type, setType] = useState('')
  const [mandatory, setMandatory] = useState(false)
  const [keywords, setKeywords] = useState('')
  const [options, setOptions] = useState('')

  useEffect(() => {
    const updatedDynamicFields = { ...dynamic_fields };
    if (oldLabel != label && oldLabel in updatedDynamicFields) {
      updatedDynamicFields[label] = updatedDynamicFields[oldLabel];
      delete updatedDynamicFields[oldLabel];
    }
    if (label in updatedDynamicFields) {
      updatedDynamicFields[label].placeholder = placeholder;
      updatedDynamicFields[label].type = type;
      updatedDynamicFields[label].mandatory = mandatory;
      updatedDynamicFields[label].keywords = keywords;
      updatedDynamicFields[label].options = options;
      setDynamicFields(updatedDynamicFields);
    }
  }, [label, placeholder, type, mandatory, keywords, options]);

  function loadDynamicField(event, key) {
    event.preventDefault();
    setOldLabel(key);
    setLabel(key);
    setPlaceholder(dynamic_fields[key].placeholder);
    setType(dynamic_fields[key].type)
    setMandatory(dynamic_fields[key].mandatory);
    setKeywords(dynamic_fields[key].keywords);
    setOptions(dynamic_fields[key].options);
  }

  function addNewLabel() {
    setDynamicFields({ ...dynamic_fields, 'NEW': { 'placeholder': '', 'type': '', 'mandatory': false, 'keywords': '', 'options': '' } });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.entries(dynamic_fields).forEach(([key, value]) => {
      const array = dynamic_fields[key].options.toString().split(',')
      const trimmedArray = [];
      for (let i = 0; i < array.length; i++) {
        const trimmedElement = array[i].trim();
        trimmedArray.push(trimmedElement);
      }
      dynamic_fields[key].options = trimmedArray
    })
    console.log(dynamic_fields)
    const data = {
      "title": "Document Permsfsdfis Conducere",
      "delete_form_date": "1680619808",
      "sections": [
        {
          "scan_document_type": "student_card",
          "text": "Studentul <nume> , din grupa , anul <anul>. Aleg optiunea <opt1>."
        },
        {
          "scan_document_type": "identity_card",
          "text": "Cu CNP <cnp>, seria , nr."
        }
      ],
      dynamic_fields
    }
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    try {
      const response = await axios.post(url, data, {headers: headers});
      console.log(response.data); // Handle successful login
      console.log(data)
    } catch (error) {
      console.log('error'); // error.response.data.message
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center p-4">
        <div className="box box-size-forms bg-primary p-5 d-flex justify-content-center align-items-center flex-column gap-5">
          <div className="title text-dark fw-bold">
            <span>Create Form</span>
          </div>
          <Container>
            <form className="row g-3 p-3 rounded-5 bg-secondary">
              <div className="col-lg-12 mb-3">
                <label htmlFor="input-title" className="form-label">Title</label>
                <input type="text" className="form-control" id="input-title" placeholder="Title" />
              </div>
              <div className="col-lg-6 mb-3">
                <Form.Label>Dynamic Fields</Form.Label>
                <ListGroup>
                  {Object.keys(dynamic_fields).map((key, i) => (
                    <ListGroup.Item key={key} action onClick={(event) => { loadDynamicField(event, key) }}>{key}</ListGroup.Item>
                  ))}
                </ListGroup>
                <div className='d-flex align-items-center justify-content-around'>
                  <Button className='m-3 custom-button custom-button-inverted medium-button-size rounded-pill fw-bold' variant="primary" onClick={addNewLabel}>Add new</Button>
                  <Button className='m-3 custom-button custom-button-inverted medium-button-size rounded-pill fw-bold' variant="primary" onClick={addNewLabel}>Delete</Button>
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <Form.Label>Label</Form.Label>
                <Form.Control className="mb-3" type="text" placeholder="Label" value={label} onChange={(e) => { setOldLabel(label); setLabel(e.target.value) }} />
                <Form.Label>Placeholder keyword</Form.Label>
                <Form.Control className="mb-3" type="text" placeholder="Placeholder keyword" value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} />
                <Form.Label>Type</Form.Label>
                <Form.Select className="mb-3" value={type} onChange={(e) => setType(e.target.value)}>
                  <option>Type</option>
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="decimal">Decimal</option>
                  <option value="date">Date</option>
                  <option value="single-choice">Single-choice</option>
                  <option value="multiple-choice">Multiple-choice</option>
                </Form.Select>
                {
                  (type == "single-choice" || type == "multiple-choice") ? <>
                    <Form.Label>Options</Form.Label>
                    <Form.Control className="mb-3" as="textarea" placeholder="option1, option2, option3 ..." rows={2} value={options} onChange={(e) => setOptions(e.target.value)} />
                  </> : null
                }
                <Form.Check className="mb-3" label="Mandatory" id="checkbox-id" checked={mandatory} onChange={(e) => setMandatory(e.target.checked)} />
                <Form.Label>Document keywords</Form.Label>
                <Form.Control as="textarea" placeholder="keyword1, keyword2, keyword3 ..." rows={2} value={keywords} onChange={(e) => setKeywords(e.target.value)} />
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="input-content" className="form-label">Content</label>
                <textarea className="form-control" id="input-content" rows="3"></textarea>
              </div>
              <div className="col-lg-12">
                <div className='d-flex align-items-center justify-content-center'>
                  <Button className='custom-button custom-button-inverted medium-button-size rounded-pill fw-bold' onClick={handleSubmit}>Create!</Button>
                </div>
              </div>
            </form>
          </Container>
          {error && <div>{error}</div>}
        </div>
      </div>
    </>
  )
}
