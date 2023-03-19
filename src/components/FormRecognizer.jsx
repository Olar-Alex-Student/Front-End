import React, { useState, useEffect } from "react";
import axios from "axios";

export const FormRecognizer = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      const endpoint = "https://bizonii-fr-front-end.cognitiveservices.azure.com/";
      const key = "9dfb04b95c654556ab24d340f65cdee1";
      
      const [file, setFile] = useState(null);

        const handleFileChange = (e) => {
            e.preventDefault();
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
        };

      const response = await axios.post(
        `${endpoint}studio/custommodel/projects/0cb9b8b2-bde7-49f3-afc3-0fda71223fe7/model-test`,
        file,
        {
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": key,
          },
        }
      );
      setFormData(response.data);
    };

    fetchData();
  }, []);    

  return (
    <div>
        <input type="file" onChange={handleFileChange} />
      <h2>Form Data:</h2>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
};
