import {
  Box,
  Container,
  Typography,
  TextField,
  Input,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function PostCreationInterface() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [nutritionFacts, setNutritionFacts] = useState("");

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
  const createPost = async () => {
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h4">Create Post</Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ width: "40%" }}
        />
        <Box
          sx={{
            px: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box sx={{ width: "80%" }}>
            <Typography>Upload Image</Typography>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </Box>

          <img
            src={preview}
            alt=""
            className="w-[80%] h-[70vh] border-[1px] border-black"
          />
        </Box>

        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Description"
          multiline
          minRows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ width: "100%" }}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Nutrional Facts"
          multiline
          minRows={3}
          value={nutritionFacts}
          onChange={(e) => setNutritionFacts(e.target.value)}
          sx={{ width: "100%" }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{}}
          onClick={() => createPost()}
        >
          Publish Post
        </Button>
      </Box>
    </>
  );
}
