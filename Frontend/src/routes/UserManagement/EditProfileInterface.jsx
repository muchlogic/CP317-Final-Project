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

export default function EditProfileInterface() {
  // attributes
  const [biography, setBiography] = useState("");
  const [picture, setPicture] = useState(null);
  const errors = ["Biography cannot be empty", "Image cannot be empty"];

  const navigate = useNavigate();

  // helper to display image to user to preview
  const [preview, setPreview] = useState(null);

  // initialization
  useEffect(() => {
    // user is not logged in and has no access to this interface
    const username = localStorage.getItem("username");
    if (username == null) {
      navigate("/login");
    }
    const picture = localStorage.getItem("picture");
    const imageUrl = `data:image/jpeg;base64,${picture}`;
    const imageAsFile = base64ToFile(
      imageUrl,
      localStorage.getItem("mimetype")
    );
    setBiography(localStorage.getItem("biography"));
    setPicture(imageAsFile);
    setPreview(imageUrl);
  }, []);

  // helpers to display error messages
  const [biographyError, setBiographyError] = useState(false);
  const [biographyErrorText, setBiographyErrorText] = useState("");
  const [pictureError, setPictureError] = useState(false);
  const [pictureErrorText, setPictureErrorText] = useState("");

  const displayError = () => {
    // Biography validation
    if (biography === "") {
      setBiographyError(true);
      setBiographyErrorText(errors[1]);
      return true;
    } else {
      setBiographyError(false);
      setBiographyErrorText("");
    }

    // Image validation
    if (picture == null) {
      setPictureError(true);
      setPictureErrorText(errors[3]);
      return true;
    } else {
      setPictureError(false);
      setPictureErrorText("");
    }

    return false; // no error
  };

  // helper function required to convert the retrieved image back into a file type to ensure compliance with database
  // ex. database recieves image as a file, so it must be of file type. If the user does not change or upload a new file,
  // the previous image must be converted to a file type
  const base64ToFile = (base64String, mimeType) => {
    // Remove the data URL part
    const base64Data = base64String.split(",")[1];

    // Create a Blob from the Base64 string
    const binary = atob(base64Data);
    const byteArrays = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      byteArrays[i] = binary.charCodeAt(i);
    }

    // Create a File object directly from the Blob
    const file = new File(
      [new Blob([byteArrays], { type: mimeType })],
      "Burger",
      { type: mimeType }
    );
    return file;
  };

  // helper function to display image to user to preview
  const handlePictureChange = (event) => {
    const selectedImage = event.target.files[0];
    setPicture(selectedImage);

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

  const editProfile = async (username, biography, picture) => {
    const jsonData = new FormData();
    jsonData.append("username", username);
    jsonData.append("biography", biography);
    jsonData.append("image", picture);

    if (displayError() == false) {
      // no errors so update post
      fetch("http://localhost:3000/user/edit-profile", {
        method: "PUT",
        body: jsonData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // update local storage data to reflect changes
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("password", data.user.password);
          localStorage.setItem("biography", data.user.biography);
          localStorage.setItem("picture", data.user.picture);
          localStorage.setItem("mimetype", data.user.mimetype);
          localStorage.setItem(
            "following",
            JSON.stringify(data.user.following)
          );
          localStorage.setItem(
            "followers",
            JSON.stringify(data.user.followers)
          );
          navigate(`/self-profile`); // redirect to view post interface
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h2" sx={{ borderBottom: "2px solid #000000" }}>
          Edit Profile
        </Typography>

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
              Upload Profile Picture
            </Typography>
            <Typography color="error">{pictureErrorText}</Typography>
            <Input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
            />
          </Box>
          <img
            src={preview}
            className="w-[80%] h-[70vh] border-[1px] mt-2 border-black rounded-[50%]"
          />
        </Box>

        <TextField
          id="outlined-basic"
          variant="outlined"
          label="biography"
          multiline
          minRows={3}
          value={biography}
          error={biographyError}
          helperText={biographyErrorText}
          onChange={(e) => setBiography(e.target.value)}
          sx={{ width: "100%" }}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{}}
          onClick={() =>
            editProfile(localStorage.getItem("username"), biography, picture)
          }
        >
          Edit Profile
        </Button>
      </Box>
    </>
  );
}
