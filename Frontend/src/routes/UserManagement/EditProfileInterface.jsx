import { Container } from "@mui/material";
import { useState, useEffect } from "react";

export default function EditProfileInterface() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Generate a preview using FileReader
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    // try {
    //   const response = await fetch("http://localhost:5000/upload", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     setMessage(data.message);
    //   } else {
    //     setMessage("Error uploading file.");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   setMessage("Error uploading file.");
    // }
  };
  return (
    <>
      <Container>
        <h1>Image Upload</h1>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        <img src={preview} alt="" width="500" height="600" />
        {message && <p>{message}</p>}
      </Container>
    </>
  );
}
