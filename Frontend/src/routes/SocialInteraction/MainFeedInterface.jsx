import { TextField, Box, Button, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useNavigate } from "react-router-dom";

export default function MainFeedInterface() {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const retrieveAllPosts = async () => {
    fetch(`http://localhost:3000/global/retrieve-all-posts`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserPosts(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    retrieveAllPosts();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          py: 5,
        }}
      >
        {userPosts.map((post, index) => {
          const imageUrl = `data:image/jpeg;base64,${post.image}`;
          return (
            <>
              <button
                key={index}
                className="flex flex-col items-center w-[80%] border-2 border-black px-5 pt-4 pb-20"
                onClick={() => navigate(`/view-post/${post.id}`)}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifySelf: "start",
                    alignSelf: "self-start",
                    mb: 1,
                  }}
                >
                  <Typography variant="h5"> {post.title}</Typography>
                  <Typography variant="h5" sx={{ ml: 2 }}>
                    | {post.likes} -
                  </Typography>
                  <ThumbUpIcon fontSize="large" sx={{ mt: "2", ml: 1 }} />
                </Box>
                <img
                  src={imageUrl}
                  className="w-[100%] h-[70vh] border-[2px] border-black"
                />
                <Typography>{post.description}</Typography>
              </button>
            </>
          );
        })}
      </Box>
    </>
  );
}
