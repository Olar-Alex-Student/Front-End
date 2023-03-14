import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Navbar, Nav, Button, Table, Container, Modal, InputGroup, Form, ListGroup, Tab } from 'react-bootstrap';
import axios from "axios";
import JoditEditor from 'jodit-react';
import {LoginForm} from './LoginForm';

export const CreateForms = () => {

  const token = sessionStorage.getItem('token');

  const id = sessionStorage.getItem('id');

  const url = `https://bizoni-backend-apis.azurewebsites.net/api/v1/users/${id}/forms/`;

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const [error, setError] = useState("");

  const editor = useRef(null);

  const [data_retension_period, setData_retension_period] = useState(30)

  const [selectedSection, setSelectedSection] = useState(null);

  const [scan_document_type, setScan_document_type] = useState('')
  const [content, setContent] = useState('');

  useEffect(() => {
    console.log(content)
  }, [content])

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
    },
    'An': {
      'placeholder': 'an',
      'type': 'single-choice',
      'mandatory': true,
      'keywords': 'An, Year',
      'options': '2000, 2001'
    }
  });

  const [sections, setSections] = useState([
    {
      "scan_document_type": "student_card",
      "text": "Studentul <nume> , din grupa , anul <an>."
    },
    {
      "scan_document_type": "identity_card",
      "text": "Cu CNP <cnp>, seria , nr."
    }
  ]);

  const [title, setTitle] = useState('')

  const [selectedLabel, setSelectedLabel] = useState('')
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

  useEffect(() => {
    const updatedSections = sections.map((section, i) => {
      if (i === selectedSection) {
        return { ...section, text: content, scan_document_type: scan_document_type };
      }
      return section;
    });
    setSections(updatedSections);

  }, [content, scan_document_type]);

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

  function loadSections(event, index) {
    event.preventDefault();
    setContent(sections[index].text)
    setScan_document_type(sections[index].scan_document_type)
  }

  function addNewLabel() {
    setDynamicFields({ ...dynamic_fields, [`NEW ${Object.keys(dynamic_fields).length + 1}`]: { 'placeholder': '', 'type': '', 'mandatory': false, 'keywords': '', 'options': '' } });
  }

  function addNewSection() {
    setSections([...sections, { 'scan_document_type': '', 'text': '' }]);
  }

  function deleteLabel() {
    const updatedDynamicFields = { ...dynamic_fields };
    delete updatedDynamicFields[selectedLabel];
    setDynamicFields(updatedDynamicFields);
  }

  function deleteSection() {
    const updatedSections = [...sections];
    delete updatedSections[selectedSection];
    setSections(updatedSections);
  }

  function json2array(json) {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
      result.push(json[key]);
    });
    return result;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.entries(dynamic_fields).forEach(([key, value]) => {
      const options_array = dynamic_fields[key].options.toString().split(',')
      const options_trimmedArray = [];

      const keywords_array = dynamic_fields[key].keywords.toString().split(',')
      const keywords_trimmedArray = [];

      for (let i = 0; i < options_array.length; i++) {
        const options_trimmedElement = options_array[i].trim();
        options_trimmedArray.push(options_trimmedElement);
      }

      for (let i = 0; i < keywords_array.length; i++) {
        const keywords_trimmedElement = keywords_array[i].trim();
        keywords_trimmedArray.push(keywords_trimmedElement);
      }

      dynamic_fields[key].options = options_trimmedArray
      dynamic_fields[key].keywords = keywords_trimmedArray
    })
    console.log(dynamic_fields)
    const dynamic_fields_array = json2array(dynamic_fields)
    const data = {
      "title": title,
      "delete_form_date": Math.floor(Date.now() / 1000 + 86400 * data_retension_period), // 2592000 = 30 days Unix epoch time
      "sections": sections,
      "dynamic_fields": dynamic_fields_array
    }
    console.log(data)
    try {
      const response = await axios.post(url, data, { headers: headers });
      console.log(response.data); // Handle successful login
      console.log(data)
    } catch (error) {
      console.log('error'); // error.response.data.message
      setError(error.response.data.message)
      // console.log(error)
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center p-4">
        <div className="box box-size-forms bg-primary p-5 d-flex justify-content-center align-items-center flex-column gap-5">
          <div className="title text-secondary fw-bold">
            <span>Create Form</span>
          </div>
          <Container>
            <form className="row g-3 p-3 rounded-5 bg-secondary">
              <div className="col-lg-12 mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control className="mb-3" type="text" placeholder="Title" onChange={(e) => { setTitle(e.target.value) }} />
                {/* <label htmlFor="input-title" className="form-label">Title</label>
                <input type="text" className="form-control" id="input-title" placeholder="Title" /> */}
              </div>
              <div className="col-lg-6 mb-3">
                <Form.Label>Dynamic Fields</Form.Label>
                <ListGroup>
                  {Object.keys(dynamic_fields).map((key, i) => (
                    <ListGroup.Item key={key} action onClick={(event) => { loadDynamicField(event, key); setSelectedLabel(key) }}>{key}</ListGroup.Item>
                  ))}
                </ListGroup>
                <div className='d-flex align-items-center justify-content-around'>
                  <Button className='m-3 custom-button custom-button-inverted medium-button-size rounded-pill fw-bold' variant="primary" onClick={addNewLabel}>Add new</Button>
                  <Button className='m-3 custom-button custom-button-inverted medium-button-size rounded-pill fw-bold' variant="primary" onClick={deleteLabel}>Delete</Button>
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
                <Form.Label>Data Retension Period</Form.Label>
                <Form.Control className="mb-3" type="number" placeholder="Data Retension Period" value={data_retension_period} onChange={(e) => setData_retension_period(Math.max(1, Math.min(60, Number(e.target.value))))} />
              </div>
              <div className="col-lg-6 mb-3">
                <Form.Label>Content</Form.Label>
                <JoditEditor
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
