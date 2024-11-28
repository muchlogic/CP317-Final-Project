import { Box, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProfileInterface() {
  const [userInformation, setUserInformation] = useState(null);

  const userProfile = {
    username: "Your mom",
    postCount: 4,
    followerCount: 50,
    bio: "Hello this is my bio blah blah blah blah blah blah",
    profilePicture: "/photosTemp/premium_photo-1663091701053-f14a2409a6e8.jpg",
    posts: "/photosTemp/photo-1515879218367-8466d910aaa4.jpg",
  };

  useEffect(() => {
    fetch("temp")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserInformation(data);
      });
  }, []);

  return (
    <>
      <Container>
        <Box className="w-full">
          <Typography variant="h1">{userProfile.username}</Typography>
        </Box>
        <Box className="flex w-full h-[15vh]">
          <Box className="w-1/3 flex justify-start items-center">
            <img
              className="rounded-full w-20 h-20 object-cover"
              src={userProfile.profilePicture}
            />
          </Box>
          <Box className="w-1/3">
            <Typography
              className="flex justify-center"
              style={{ marginTop: "24px" }}
            >
              {" "}
              Post count{" "}
            </Typography>
            <Typography className="flex justify-center">
              {" "}
              {userProfile.postCount}
            </Typography>
          </Box>
          <Box className="w-1/3">
            <Typography
              className="flex justify-center"
              style={{ marginTop: "24px" }}
            >
              {" "}
              Follower count{" "}
            </Typography>
            <Typography className="flex justify-center">
              {" "}
              {userProfile.followerCount}{" "}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1">{userProfile.bio}</Typography>
        <Link to="/edit-profile">
          <button className="border-2 px-6 py-3 mt-3">Edit Profile</button>
        </Link>
        <Box className="grid grid-rows-2 grid-cols-3 h-[fit] gap-2 mt-16">
          <img
            src={userProfile.posts}
            alt="Placeholder 1"
            className="w-full h-full object-cover"
          />
          <img
            src={userProfile.profilePicture}
            alt="Placeholder 2"
            className="w-full h-full object-cover"
          />
          <img
            src={userProfile.posts}
            alt="Placeholder 3"
            className="w-full h-full object-cover"
          />
          <img
            src={userProfile.profilePicture}
            alt="Placeholder 4"
            className="w-full h-full object-cover"
          />
          <img
            src={userProfile.posts}
            alt="Placeholder 5"
            className="w-full h-full object-cover"
          />
          <img
            src={userProfile.profilePicture}
            alt="Placeholder 6"
            className="w-full h-full object-cover"
          />
          <img
            src={userProfile.profilePicture}
            alt="Placeholder 4"
            className="w-full h-full object-cover"
          />
          <img
            src={userProfile.posts}
            alt="Placeholder 5"
            className="w-full h-full object-cover"
          />
          <img
            src={userProfile.profilePicture}
            alt="Placeholder 6"
            className="w-full h-full object-cover"
          />
          <img
            src={userProfile.profilePicture}
            alt="Placeholder 4"
            className="w-full h-full object-cover"
          />
          <img
            src={userProfile.posts}
            alt="Placeholder 5"
            className="w-full h-full object-cover"
          />
          <img
            src={userProfile.profilePicture}
            alt="Placeholder 6"
            className="w-full h-full object-cover"
          />
          <img
            src={userProfile.profilePicture}
            alt="Placeholder 4"
            className="w-full h-full object-cover"
          />
          <img
            src={userProfile.posts}
            alt="Placeholder 5"
            className="w-full h-full object-cover"
          />
          <img
            src={userProfile.profilePicture}
            alt="Placeholder 6"
            className="w-full h-full object-cover"
          />
          <img
            src={userProfile.profilePicture}
            alt="Placeholder 4"
            className="w-full h-full object-cover"
          />
          <img
            src={userProfile.posts}
            alt="Placeholder 5"
            className="w-full h-full object-cover"
          />
          <img
            src={userProfile.profilePicture}
            alt="Placeholder 6"
            className="w-full h-full object-cover"
          />
        </Box>
      </Container>
    </>
  );
}
