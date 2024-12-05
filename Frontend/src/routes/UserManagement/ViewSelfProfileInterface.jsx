import { Box, Button, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ViewSelfProfileInterface() {
  // attributes
  const [username, setUsername] = useState("");
  const [followers, setFollowers] = useState([]);
  const [biography, setBiography] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  const navigate = useNavigate();

  // initialization
  useEffect(() => {
    // user is not logged in and has no access to this interface
    const username = localStorage.getItem("username");
    if (username == null) {
      navigate("/login");
    } else {
      setUsername(localStorage.getItem("username"));
      setBiography(localStorage.getItem("biography"));
      setFollowers(JSON.parse(localStorage.getItem("followers")));

      const image = localStorage.getItem("picture");
      const imageUrl = `data:image/jpeg;base64,${image}`;
      setProfilePicture(imageUrl);

      retrievePostsByUsername(username);
    }
  }, []);

  const retrievePostsByUsername = async (username) => {
    fetch(
      `http://localhost:3000/global/retrieve-posts-by-username/${username}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserPosts(data.data.reverse());
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Container>
        <Box className="">
          <Typography variant="h2" sx={{ borderBottom: "2px solid #000000" }}>
            {username}
          </Typography>
        </Box>
        <Box className="flex w-full h-[15vh] items-center mt-4">
          <Box className="w-1/3 flex justify-start items-center">
            <img
              className="rounded-full w-20 h-20 object-cover"
              src={profilePicture}
            />
          </Box>
          <Box className="w-1/3 ">
            <Typography
              className="flex justify-center"
              style={{ marginTop: "24px" }}
            >
              Post count
            </Typography>
            <Typography className="flex justify-center">
              {userPosts.length}
            </Typography>
          </Box>
          <Box className="w-1/3">
            <Typography
              className="flex justify-center"
              style={{ marginTop: "24px" }}
            >
              Follower Count
            </Typography>
            <Typography className="flex justify-center">
              {followers.length}
            </Typography>
          </Box>
        </Box>
        <Box
          className="flex items-center justify-between"
          sx={{ borderBottom: "2px solid #000000", paddingBottom: "20px" }}
        >
          <Typography variant="body1">
            {biography === null ? "No Biography" : biography}
          </Typography>
          <Link to="/edit-profile">
            <Button variant="outlined" className="border-2 px-6 py-3 mt-3">
              Edit Profile
            </Button>
          </Link>
        </Box>
        <Box className="grid grid-rows-2 grid-cols-3 h-[fit] gap-2 mt-16">
          {userPosts.map((post, index) => {
            const imageUrl = `data:image/jpeg;base64,${post.image}`;
            return (
              <Button
                key={index}
                onClick={() => navigate(`/view-post/${post.id}`)}
              >
                <img
                  src={imageUrl}
                  alt="Placeholder 1"
                  className="w-full h-full object-cover"
                />
              </Button>
            );
          })}
        </Box>
      </Container>
    </>
  );
}
