import {
  TextField,
  Box,
  Button,
  Container,
  Typography,
  Divider,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewPostInterface() {
  // attributes
  const [username, setUsername] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [description, setDescription] = useState("");
  const [nutritionFacts, setNutritionFacts] = useState("");
  const [image, setImage] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState([]);
  const [comments, setComments] = useState([]);
  const [postID, setPostID] = useState(null);
  const [likeStatus, setLikeStatus] = useState(false);
  const [comment, setComment] = useState("");
  const errors = ["Comment should be less than 100 characters"];

  const navigate = useNavigate();

  // error handling/helpers
  const [commentError, setCommentError] = useState(false);
  const [commentErrorText, setCommentErrorText] = useState("");
  const displayError = () => {
    // Comment validation
    if (comment.length > 100) {
      setCommentError(true);
      setCommentErrorText(errors[0]);
      return true;
    } else {
      setCommentError(false);
      setCommentErrorText("");
    }
    return false;
  };

  // initialization
  useEffect(() => {
    const currentPath = window.location.pathname; // get current url path
    const postID = currentPath.split("/").filter(Boolean).pop(); // retrieve value after last '/' for postID
    setPostID(postID);
    retrievePostByID(postID);
  }, []);

  const retrievePostByID = async (postID) => {
    fetch(`http://localhost:3000/global/retrieve-post-by-id/${postID}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const post = data.data;
        setPostTitle(post.title);
        setDescription(post.description);
        setNutritionFacts(post.nutritionfacts);
        setLikes(post.likes);
        setLiked(post.liked);
        setComments(post.comments);
        setUsername(post.username);
        const imageUrl = `data:image/jpeg;base64,${post.image}`;
        setImage(imageUrl);

        // disable abiltiy for user to like if they have liked before
        if (post.liked.includes(localStorage.getItem("username"))) {
          setLikeStatus(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const commentPost = (postID, comment, selfUsername, otherUsername) => {
    if (!displayError()) {
      fetch("http://localhost:3000/interact/comment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postID, comment, selfUsername, otherUsername }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          retrievePostByID(postID);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const likePost = (postID, selfUsername, otherUsername) => {
    fetch("http://localhost:3000/interact/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postID, selfUsername, otherUsername }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        retrievePostByID(postID);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Container>
        <Typography variant="h2" sx={{ borderBottom: "2px solid #000000" }}>
          {postTitle}
        </Typography>
        <Box className="flex justify-center my-4">
          <img
            className="w-[80%] h-[70vh] border-[1px] border-black"
            src={image}
            alt="Image"
          ></img>
        </Box>

        <Box className="flex flex-col">
          <Button onClick={() => navigate(`/other-profile/${username}`)}>
            <Typography variant="h6">Creator: {username}</Typography>
          </Button>
          <Divider />
          {username == localStorage.getItem("username") ? (
            <>
              <Button onClick={() => navigate(`/edit-post/${postID}`)}>
                <Typography variant="h6">Edit Post</Typography>
              </Button>
            </>
          ) : (
            <></>
          )}
        </Box>

        {/* Like Button */}
        <Box className="flex items-center mt-5">
          <Button
            variant="contained"
            color="primary"
            sx={{}}
            disabled={likeStatus}
            onClick={() =>
              likePost(postID, localStorage.getItem("username"), username)
            }
          >
            Like
          </Button>

          <Typography sx={{ ml: 2 }}>{likes} - </Typography>
          <ThumbUpIcon />
        </Box>

        {/* Description Section */}
        <Box className="flex flex-col mt-5">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Description
          </Typography>
          <Typography>{description}</Typography>
          <Divider />
        </Box>

        {/* Nutritional Facts Section */}
        <Box className="flex flex-col mt-5">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Nutritional Facts
          </Typography>

          <Typography>{nutritionFacts}</Typography>
          <Divider />
        </Box>

        {/* Comment Section */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Comments
          </Typography>
          <Box className="border-2 border-solid border-black mb-2">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <Box key={index}>
                  <Typography>
                    {comment.username}: {comment.comment}
                  </Typography>
                  <Divider />
                </Box>
              ))
            ) : (
              <Typography>No comments</Typography>
            )}
          </Box>
        </Box>

        {/* Add Comment */}
        <Box>
          <TextField
            id="outlined-basic"
            multiline
            rows={2}
            label="Add a comment"
            sx={{ width: "100%" }}
            error={commentError}
            helperText={commentErrorText}
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></TextField>
          <Button
            variant="contained"
            color="primary"
            sx={{}}
            onClick={() =>
              commentPost(
                postID,
                comment,
                localStorage.getItem("username"),
                username
              )
            }
            style={{ marginTop: "10px" }}
          >
            Post Comment
          </Button>
        </Box>
      </Container>
    </>
  );
}
