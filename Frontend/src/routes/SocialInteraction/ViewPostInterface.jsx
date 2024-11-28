import { TextField, Box, Button, Container,Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function ViewPostInterface() {
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [likeCount, setLikeCount] = useState(0)
  const [comments, setComments] = useState([])

  const handleCommentPost = (post, selfUsername, otherUsername) => {
    if (comment.length > 100){
      setError('Too many characters')
    } else {
      setError('')
      setComments([...comments, comment])
      setComment('')
    }
  }

  const handleLikePost = (post, selfUsername, otherUsername) => {
    setLikeCount (likeCount + 1)
  }

  return (
    <>
      <Container>
        {/* The Post */}
        <Typography variant="h4">Post Title</Typography>
        <Box>
          <img src="https://via.placeholder.com/600x400" alt="Image" style={{ width: '50%', maxHeight: '400px', objectFit: 'cover', marginBottom: '20px' }}></img>
        </Box>
        <Typography variant="h6">Description</Typography>

        {/* Like Button */}
        <Box sx={{bgcolor: "grey", width:"8%", marginTop:"100px"}}>
          <Button type="button" color="black"onClick={handleLikePost}>
            Like
          </Button>
          {likeCount}
        </Box>

        {/* Comment Section */}
        <Typography variant="h6">Comments</Typography>
        {comments.length > 0 ? (
          comments.map((c, index) => (
            <Typography key={index} variant="body2" style={{ margin: '10px 0' }}>
              {c}
            </Typography>
          ))
        ) : (
          <Typography variant="body2">
            No comments
          </Typography>
        )}
        

        {/* Add Comment */}
        <TextField label="Add a comment" variant="outlined" value={comment} onChange={(e) => setComment(e.target.value)}>
        </TextField>
        <Button onClick={handleCommentPost} style={{marginTop:'10px'}}>Post</Button>
      </Container>
    </>
  );
}