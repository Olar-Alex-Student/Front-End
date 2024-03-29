import React, { useState } from 'react';
import axios from 'axios';

export const FormRecognizer = () => {
  const [formResults, setFormResults] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const userID = sessionStorage.getItem('id');
  const token = sessionStorage.getItem('token');

  async function handleSubmit(event) {
    event.preventDefault();

    const url = `https://bizoni-backend-apis.azurewebsites.net/api/v1/users/${userID}/utilityscan_document/`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }

    try {
      const response = await axios.post(
        url,
        formData,
        {headers: headers}
      );
      setFormResults(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleFileChange(event) {
    setImageFile(event.target.files[0]);
  }

  const formData = new FormData();
    formData.append('document', imageFile);

  if (!formResults) {
    return (
      <div>
        <h1>Form Recognizer</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Upload an image:
            <input type="file" onChange={handleFileChange} />
          </label>
          <button type="submit">Analyze</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>Form Recognizer Results</h1>
      <pre>{JSON.stringify(formResults, null, 2)}</pre>
    </div>
  );
}
