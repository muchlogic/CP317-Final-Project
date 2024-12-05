import {
  Box,
  Container,
  Typography,
  TextField,
  Input,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PostCreationInterface() {
  const navigate = useNavigate();

  // attributes
  const [postTitle, setPostTitle] = useState("");
  const [description, setDescription] = useState("");
  const [nutritionFacts, setNutritionFacts] = useState("");
  const [image, setImage] = useState(null);

  // initialization
  useEffect(() => {
    // user is not logged in and has no access to this interface
    const username = localStorage.getItem("username");
    if (username == null) {
      navigate("/login");
    }
  });

  // helper to display preview of uploaded image
  const [preview, setPreview] = useState(null);

  // helpers to display error messages
  const errors = [
    "Title cannot be empty",
    "Description cannot be empty",
    "Nutritional facts cannot be empty",
    "Image cannot be empty",
  ];
  const [titleError, setTitleError] = useState(false);
  const [titleErrorText, setTitleErrorText] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionErrorText, setDescriptionErrorText] = useState("");
  const [nutritionFactsError, setNutritionFactsError] = useState(false);
  const [nutritionFactsErrorText, setNutritionFactsErrorText] = useState("");
  const [imageError, setImageError] = useState(false);
  const [imageErrorText, setImageErrorText] = useState("");

  const displayError = () => {
    // Title validation
    if (postTitle === "") {
      setTitleError(true);
      setTitleErrorText(errors[0]);
      return true;
    } else {
      setTitleError(false);
      setTitleErrorText("");
    }

    // Description validation
    if (description === "") {
      setDescriptionError(true);
      setDescriptionErrorText(errors[1]);
      return true;
    } else {
      setDescriptionError(false);
      setDescriptionErrorText("");
    }

    // Nutritional facts validation
    if (nutritionFacts === "") {
      setNutritionFactsError(true);
      setNutritionFactsErrorText(errors[2]);
      return true;
    } else {
      setNutritionFactsError(false);
      setNutritionFactsErrorText("");
    }

    // Image validation
    if (image == null) {
      setImageError(true);
      setImageErrorText(errors[3]);
      return true;
    } else {
      setImageError(false);
      setImageErrorText("");
    }
    return false;
  };

  const createPost = async (
    postTitle,
    description,
    nutritionFacts,
    image,
    username
  ) => {
    const jsonData = new FormData();
    jsonData.append("image", image);
    jsonData.append("postTitle", postTitle);
    jsonData.append("description", description);
    jsonData.append("nutritionFacts", nutritionFacts);
    jsonData.append("username", username);

    if (!displayError()) {
      fetch("http://localhost:3000/content/upload", {
        method: "POST",
        body: jsonData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          navigate(`/view-post/${data.postID}`);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  // helper to generate preview of image to display for the user
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

    // Generate a preview using FileReader
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    } else {
      setPreview(null);
    }
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
          error={titleError}
          helperText={titleErrorText}
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
            <Typography color="error">{imageErrorText}</Typography>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
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
          error={descriptionError}
          helperText={descriptionErrorText}
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
          error={nutritionFactsError}
          helperText={nutritionFactsErrorText}
          onChange={(e) => setNutritionFacts(e.target.value)}
          sx={{ width: "100%" }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{}}
          onClick={() =>
            createPost(
              postTitle,
              description,
              nutritionFacts,
              image,
              localStorage.getItem("username")
            )
          }
        >
          Publish Post
        </Button>
      </Box>
    </>
  );
}
