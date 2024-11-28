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
  const [postTitle, setPostTitle] = useState("");
  const [description, setDescription] = useState("");
  const [nutritionFacts, setNutritionFacts] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const createPost = async () => {
    const jsonData = new FormData();
    jsonData.append("image", file);
    jsonData.append("postTitle", postTitle);
    jsonData.append("description", description);
    jsonData.append("nutritionFacts", nutritionFacts);
    jsonData.append("username", "temp");

    fetch("http://localhost:3000/posts/upload", {
      method: "POST",
      body: jsonData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create post");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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

  const test = async () => {
    fetch(`http://localhost:3000/global/retrieve-by-username/temp`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to get post");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h2" sx={{ borderBottom: "2px solid #000000" }}>
          Create Post
        </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
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
            <Typography variant="h4" sx={{ mb: 1 }}>
              Upload Image
            </Typography>
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

        <Button
          variant="contained"
          color="primary"
          sx={{}}
          onClick={() => test()}
        >
          Test
        </Button>
      </Box>
    </>
  );
}
