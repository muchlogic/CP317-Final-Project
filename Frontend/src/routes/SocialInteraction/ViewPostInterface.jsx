import { TextField, Box, Button, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function ViewPostInterface() {
  const testData = {
    title: "Ice Cap",
    description: "I love ice caps",
    image: "https://via.placeholder.com/600x400",
  };

  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);

  const handleCommentPost = (post, selfUsername, otherUsername) => {
    if (comment.length > 100) {
      setError("Too many characters");
    } else {
      setError("");
      setComments([...comments, comment]);
      setComment("");
    }
  };

  const handleLikePost = (post, selfUsername, otherUsername) => {
    setLikeCount(likeCount + 1);
  };

  return (
    <>
      <Container>
        {/* The Post */}
        <Box className="mb-2">
          <Typography variant="h4">{testData.title}</Typography>
        </Box>
        <Box className="flex justify-center">
          <img
            className="w-[80%] h-[70vh] border-[1px] border-black"
            src={testData.image}
            alt="Image"
          ></img>
        </Box>
        <Typography variant="h6">{testData.description}</Typography>

        {/* Like Button */}
        <Box className="flex items-center mr-3">
          <Button
            variant="contained"
            color="primary"
            sx={{}}
            onClick={handleLikePost}
          >
            Like
          </Button>
          <Typography className="ml-3">{likeCount}</Typography>
        </Box>

        {/* Comment Section */}
        <Typography variant="h6">Comments</Typography>
        <Box className="border-2 border-solid border-black mb-2">
          {comments.length > 0 ? (
            comments.map((c, index) => (
              <Typography
                key={index}
                variant="body2"
                style={{ margin: "10px 0" }}
              >
                {c}
              </Typography>
            ))
          ) : (
            <Typography variant="body2">No comments</Typography>
          )}
        </Box>

        {/* Add Comment */}
        <Box>
          <TextField
            id="outlined-basic"
            multiline
            minRows={3}
            label="Add a comment"
            sx={{ width: "100%" }}
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></TextField>
          <Button
            variant="contained"
            color="primary"
            sx={{}}
            onClick={handleCommentPost}
            style={{ marginTop: "10px" }}
          >
            Post Comment
          </Button>
        </Box>
      </Container>
    </>
  );
}
