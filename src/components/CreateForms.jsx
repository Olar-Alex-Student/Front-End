import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Navbar, Nav, Button, Table, Container, Modal, InputGroup, Form, ListGroup, Tab, Alert } from 'react-bootstrap';
import axios from "axios";
import JoditEditor from 'jodit-react';
import { useNavigate } from "react-router-dom";

export const CreateForms = () => {
  const navigate = useNavigate();

  const { form_id_url } = useParams()

  const [formID, setFromID] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const handleCloseError = () => setShowError(false);
  const handleShowError = () => setShowError(true);

  const editor = useRef(null);

  const [dynamic_fields, setDynamicFields] = useState([
    {
      'label': 'Nume',
      'placeholder': 'nume',
      'type': 'text',
      'mandatory': true,
      'keywords': 'Nume, Last name',
      'options': ''
    },
    {
      'label': 'Prenume',
      'placeholder': 'prenume',
      'type': 'text',
      'mandatory': true,
      'keywords': 'Prenume, First name',
      'options': ''
    },
    {
      'label': 'CNP',
      'placeholder': 'cnp',
      'type': 'number',
      'mandatory': true,
      'keywords': 'CNP, Social Number',
      'options': ''
    },
    {
      'label': 'An',
      'placeholder': 'an',
      'type': 'single-choice',
      'mandatory': true,
      'keywords': 'An, Year',
      'options': '1, 2, 3, 4'
    },
    {
      'label': 'Seria',
      'placeholder': 'seria',
      'type': 'text',
      'mandatory': true,
      'keywords': 'Seria',
      'options': ''
    },
    {
      'label': 'Nr',
      'placeholder': 'nr',
      'type': 'number',
      'mandatory': true,
      'keywords': 'numar, nr',
      'options': ''
    }
  ]);

  const [sections, setSections] = useState([
    {
      "scan_document_type": "student_card",
      "text": "Studentul {nume} {prenume}, din grupa , anul {an}."
    },
    {
      "scan_document_type": "identity_card",
      "text": "Cu CNP {cnp}, seria {seria}, nr. {nr}"
    }
  ]);

  const [title, setTitle] = useState('')

  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedDynamic_field, setSelectedDynamic_field] = useState(null)

  const [data_retention_period, setData_retention_period] = useState(30)
  const [scan_document_type, setScan_document_type] = useState('')
  const [content, setContent] = useState('');

  const [label, setLabel] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const [type, setType] = useState('')
  const [mandatory, setMandatory] = useState(false)
  const [keywords, setKeywords] = useState('')
  const [options, setOptions] = useState('')

  const [create, setCreate] = useState(true)

  async function handleEdit() {
    const token = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('id');
    const url_edit = `https://bizoni-backend-apis.azurewebsites.net/api/v1/users/${id}/forms/${form_id_url}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(url_edit, { headers: headers });
      console.log(response.data); // Handle successful login
      setFromID(response.data.id);
      setTitle(response.data.title)
      setData_retention_period(response.data.data_retention_period)
      setDynamicFields(response.data.dynamic_fields)
      setSections(response.data.sections)
    } catch (error) {
      console.log('error', error); // error.response.data.message
      setError(error.response.data.detail)
      handleShowError()
    }
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      if (window.location.pathname.includes('edit')) {
        handleEdit()
        setCreate(false)
      }
    }

    return () => { ignore = true; }
  }, []);

  useEffect(() => {
    const updatedDynamicFields = dynamic_fields.map((dynamic_field_temp, index) => {
      if (index === selectedDynamic_field) {
        return { ...dynamic_field_temp, "label": label, "placeholder": placeholder, "type": type, "mandatory": mandatory, "keywords": keywords, "options": options };
      }
      return dynamic_field_temp;
    });
    setDynamicFields(updatedDynamicFields);
  }, [label, placeholder, type, mandatory, keywords, options]);

  useEffect(() => {
    const updatedSections = sections.map((section_temp, index) => {
      if (index === selectedSection) {
        return { ...section_temp, "text": content, "scan_document_type": scan_document_type };
      }
      return section_temp;
    });
    setSections(updatedSections);
  }, [content, scan_document_type]);

  function loadDynamicField(event, index) {
    event.preventDefault();
    setLabel(dynamic_fields[index].label)
    setPlaceholder(dynamic_fields[index].placeholder);
    setType(dynamic_fields[index].type)
    setMandatory(dynamic_fields[index].mandatory);
    setKeywords(dynamic_fields[index].keywords);
    setOptions(dynamic_fields[index].options);
  }

  function loadSections(event, index) {
    event.preventDefault();
    setContent(sections[index].text)
    setScan_document_type(sections[index].scan_document_type)
  }

  function addNewDynamicField() {
    setDynamicFields([...dynamic_fields, { 'label': `NEW ${dynamic_fields.length + 1}`, 'placeholder': '', 'type': '', 'mandatory': false, 'keywords': '', 'options': '' }]);
  }

  function addNewSection() {
    setSections([...sections, { 'scan_document_type': '', 'text': '' }]);
  }

  function deleteDynamic_field() {
    const updatedDynamicFields = [...dynamic_fields];
    delete updatedDynamicFields[selectedDynamic_field];
    setDynamicFields(updatedDynamicFields);
  }

  function deleteSection() {
    const updatedSections = [...sections];
    delete updatedSections[selectedSection];
    setSections(updatedSections);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const token = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('id');
    const url = `https://bizoni-backend-apis.azurewebsites.net/api/v1/users/${id}/forms/`;
    const headers = { Authorization: `Bearer ${token}` };

    console.log(token)

    dynamic_fields.forEach((dynamic_field, index) => {
      const options_array = dynamic_field.options.toString().split(',')
      const options_trimmedArray = [];

      const keywords_array = dynamic_field.keywords.toString().split(',')
      const keywords_trimmedArray = [];

      for (let i = 0; i < options_array.length; i++) {
        const options_trimmedElement = options_array[i].trim();
        options_trimmedArray.push(options_trimmedElement);
      }

      for (let i = 0; i < keywords_array.length; i++) {
        const keywords_trimmedElement = keywords_array[i].trim();
        keywords_trimmedArray.push(keywords_trimmedElement);
      }

      dynamic_field.options = options_trimmedArray
      dynamic_field.keywords = keywords_trimmedArray
    })
    console.log(dynamic_fields)
    const output_data = {
      "title": title,
      "data_retention_period": data_retention_period,
      "sections": sections,
      "dynamic_fields": dynamic_fields
    }
    console.log(output_data)
    try {
      if (create) {
        const response = await axios.post(url, output_data, { headers: headers });
        console.log(response.data); // Handle successful login
        console.log(response.data.id);
        setFromID(response.data.id);
      }
      else {
        const url_edit = `https://bizoni-backend-apis.azurewebsites.net/api/v1/users/${id}/forms/${form_id_url}`;
        const response = await axios.put(url_edit, output_data, { headers: headers });
        console.log(response.data); // Handle successful login
        console.log(response.data.id);
        setFromID(response.data.id);
      }
      handleShow()
    } catch (error) {
      console.log('error', error);
      setError(error.response.data.detail)
      handleShowError()
    }
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if(sessionStorage.getItem('loggedin') == 'false') {
        navigate("/login")
      }
    }
    return () => { ignore = true; }
  }, []);

  return (
    <>
      <div className="component-container container d-flex justify-content-center flex-column align-items-center">
        {showError ?
          <Alert className='sticky-top' variant="danger" onClose={() => setShowError(false)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            {(typeof error == 'string') ?
              <p>{error}</p> : <p>Please fill all the fields.</p>
            }
          </Alert>
          : null}
        <div className="box box-size-forms bg-primary d-flex justify-content-center align-items-center flex-column gap-5">
          <div className="title text-secondary fw-bold">
            <span>{create ? "Create" : "Edit"} Form</span>
          </div>
          <Container>
            <form className="row g-3 p-3 rounded-5 bg-secondary">
              <div className="col-lg-12 mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control className="mb-3" type="text" placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                {/* <label htmlFor="input-title" className="form-label">Title</label>
                <input type="text" className="form-control" id="input-title" placeholder="Title" /> */}
              </div>
              <div className="col-lg-6 mb-3">
                <Form.Label>Dynamic Fields</Form.Label>
                <ListGroup>
                  {dynamic_fields.map((element, index) => (
                    <ListGroup.Item key={index} action onClick={(event) => { loadDynamicField(event, index); setSelectedDynamic_field(index) }}>{element['label']}</ListGroup.Item>
                  ))}
                </ListGroup>
                <div className='d-flex align-items-center justify-content-around'>
                  <Button className='m-3 custom-button custom-button-inverted medium-button-size rounded-pill fw-bold' variant="primary" onClick={addNewDynamicField}>Add new</Button>
                  <Button className='m-3 custom-button custom-button-inverted medium-button-size rounded-pill fw-bold' variant="primary" onClick={deleteDynamic_field}>Delete</Button>
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <Form.Label>Label</Form.Label>
                <Form.Control className="mb-3" type="text" placeholder="Label" value={label} onChange={(e) => { setLabel(e.target.value) }} />
                <Form.Label>Placeholder keyword</Form.Label>
                <Form.Control className="mb-3" type="text" placeholder="Placeholder keyword" value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} />
                <Form.Label>Type</Form.Label>
                <Form.Select className="mb-3" value={type} onChange={(e) => setType(e.target.value)}>
                  {/* <option>Type</option> */}
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
                <Form.Label>Sections</Form.Label>
                <ListGroup>
                  {sections.map((section, index) => (
                    <ListGroup.Item key={index} action onClick={(event) => { loadSections(event, index); setSelectedSection(index) }}>{`Section ${index + 1}`}</ListGroup.Item>
                  ))}
                </ListGroup>
                <div className='d-flex align-items-center justify-content-around'>
                  <Button className='m-3 custom-button custom-button-inverted medium-button-size rounded-pill fw-bold' variant="primary" onClick={addNewSection}>Add new</Button>
                  <Button className='m-3 custom-button custom-button-inverted medium-button-size rounded-pill fw-bold' variant="primary" onClick={deleteSection}>Delete</Button>
                </div>
                <Form.Label>Data Retention Period</Form.Label>
                <Form.Control className="mb-3" type="number" placeholder="Data Retention Period" value={data_retention_period} onChange={(e) => setData_retention_period(Math.max(1, Math.min(60, Number(e.target.value))))} />
              </div>
              <div className="col-lg-6 mb-3">
                <Form.Label>Content</Form.Label>
                <JoditEditor className="mb-3"
                  ref={editor}
                  value={content}
                  onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={newContent => { }}
                />
                <Form.Label>Scan document type</Form.Label>
                <Form.Select className="mb-3" value={scan_document_type} onChange={(e) => setScan_document_type(e.target.value)} defaultValue="none">
                  {/* <option>Scan document type</option> */}
                  <option value="none">None</option>
                  <option value="identity_card">Identity Card</option>
                  <option value="passport">Passport</option>
                  <option value="birth_certificate">Birth Certificate</option>
                  <option value="vehicle_identity_card">Vehicle Identity Card</option>
                  <option value="student_card">Student Card</option>
                  <option value="any_document"> Any Document</option>
                </Form.Select>
              </div>
              <div className="col-lg-12">
                <div className='d-flex align-items-center justify-content-center'>
                  <Button className='custom-button custom-button-inverted medium-button-size rounded-pill fw-bold' onClick={(e) => { handleSubmit(e) }}>{create ? "Create" : "Edit"}!</Button>
                </div>
              </div>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Form Created</Modal.Title>
                </Modal.Header>
                <Modal.Body>What do you want to do with this form?</Modal.Body>
                <Modal.Footer>
                  <Button href="/" variant="secondary" onClick={handleClose}>
                    Go Back Home
                  </Button>
                  <Button href={`/forms/fill/${formID}`} variant="primary" onClick={handleClose}>
                    Fill Form
                  </Button>
                </Modal.Footer>
              </Modal>
            </form>
          </Container>
        </div>
      </div>
    </>
  )
}
