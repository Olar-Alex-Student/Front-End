import React, { useState } from 'react';
import axios from 'axios';

export const FormRecognizer = () => {
  const [formResults, setFormResults] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const apiKey = '9dfb04b95c654556ab24d340f65cdee1';
    const endpoint = 'https://bizonii-fr-front-end.cognitiveservices.azure.com/';
    const formID = '0cb9b8b2-bde7-49f3-afc3-0fda71223fe7';
    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const response = await axios.post(
        `https://formrecognizer.appliedai.azure.com/studio/custommodel/projects/0cb9b8b2-bde7-49f3-afc3-0fda71223fe7/model-test`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Ocp-Apim-Subscription-Key': apiKey,
            'Access-Control-Allow-Origin': '*'
          }
        }
      );

      setFormResults(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleFileChange(event) {
    setImageFile(event.target.files[0]);
  }

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
