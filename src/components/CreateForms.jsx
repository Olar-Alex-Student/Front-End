import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Button, Table, Container, Modal, InputGroup, Form, ListGroup, Tab } from 'react-bootstrap';

export const CreateForms = () => {

  const [dynamic_fields, setDynamicFields] = useState({
    'Nume': {
      'placeholder': 'nume',
      'mandatory': true,
      'documentKeywords': 'Nume, Last name'
    },
    'Prenume': {
      'placeholder': 'prenume',
      'mandatory': true,
      'documentKeywords': 'Prenume, First name'
    },
    'CNP': {
      'placeholder': 'cnp',
      'mandatory': true,
      'documentKeywords': 'CNP, Social Number'
    }
  });

  const [oldLabel, setOldLabel] = useState('')
  const [label, setLabel] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const [mandatory, setMandatory] = useState(false)
  const [documentKeywords, setDocumentKeywords] = useState('')

  useEffect(() => {
    const updatedDynamicFields = { ...dynamic_fields };
    if(oldLabel != label && oldLabel in updatedDynamicFields) 
    {
      updatedDynamicFields[label] = updatedDynamicFields[oldLabel];
      delete updatedDynamicFields[oldLabel];
    }
    if (label in updatedDynamicFields) {
      updatedDynamicFields[label].placeholder = placeholder;
      updatedDynamicFields[label].mandatory = mandatory;
      updatedDynamicFields[label].documentKeywords = documentKeywords;
      setDynamicFields(updatedDynamicFields);
    }
  }, [label, placeholder, mandatory, documentKeywords]);

  function loadDynamicField(event, key) {
    event.preventDefault();
    setOldLabel(key);
    setLabel(key);
    setPlaceholder(dynamic_fields[key].placeholder);
    setMandatory(dynamic_fields[key].mandatory); 
    setDocumentKeywords(dynamic_fields[key].documentKeywords); 
  }

  function addNewLabel() {
    setDynamicFields({...dynamic_fields, 'NEW': {'placeholder': '', 'mandatory': false, 'documentKeywords': ''}});
  }

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
                    <ListGroup.Item action onClick={(event) => { loadDynamicField(event, key) }}>{key}</ListGroup.Item>
                  ))}
                </ListGroup>
                <div className='d-flex align-items-center justify-content-around'>
                <Button className='m-3 custom-button custom-button-inverted medium-button-size rounded-pill fw-bold' variant="primary" onClick={addNewLabel}>Add new</Button>
                <Button className='m-3 custom-button custom-button-inverted medium-button-size rounded-pill fw-bold' variant="primary" onClick={addNewLabel}>Delete</Button>
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <Form.Label>Label</Form.Label>
                <Form.Control className="mb-3" type="text" placeholder="Label" value={label} onChange={(e) => {setOldLabel(label); setLabel(e.target.value)}} />
                <Form.Label>Placeholder keyword</Form.Label>
                <Form.Control className="mb-3" type="text" placeholder="Placeholder keyword" value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} />
                <Form.Check className="mb-3" label="Mandatory" id="checkbox-id" checked={mandatory}  onChange={(e) => setMandatory(e.target.checked)} />
                <Form.Label>Document keywords</Form.Label>
                <Form.Control as="textarea" placeholder="example, example, example ..." rows={3} value={documentKeywords} onChange={(e) => setDocumentKeywords(e.target.value)} />
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="input-content" className="form-label">Content</label>
                <textarea className="form-control" id="input-content" rows="3"></textarea>
              </div>
              <div className="col-lg-12">
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
