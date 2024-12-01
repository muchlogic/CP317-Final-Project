import { Container, Box, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import logoImg from "./../public/logo.png";
export default function GlobalInterface() {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{}} className="bg-[url(./public/background.jpg)]">
        <div className="w-[100%] h-[80px] bg-white fixed top-0 z-10 flex justify-center border-2 border-black">
          <img src={logoImg} />
        </div>
        <Container
          maxWidth="md"
          sx={{
            position: "relative",
            bgcolor: "white",
            mt: "80px",
          }}
          disableGutters
        >
          <Box sx={{ px: 2, pb: 2, mb: "8vh", minHeight: "82vh" }}>
            <Outlet />
          </Box>
          <Box
            sx={{
              position: "fixed",
              left: 0,
              bottom: 0,
              width: "100%",
              bgcolor: "white",
              border: "2px solid #000000",
              zIndex: 10,
            }}
          >
            <div className="flex justify-center items-center h-[8vh]">
              <nav className="grid-cols-3 ">
                <IconButton
                  sx={{
                    width: "100px",
                    "&:hover": {
                      backgroundColor: "inherit",
                      boxShadow: "none",
                    },
                  }}
                  onClick={() => navigate("/")}
                >
                  <HomeIcon sx={{ fontSize: 40 }} />
                </IconButton>
                <IconButton
                  sx={{
                    width: "100px",
                    "&:hover": {
                      backgroundColor: "inherit",
                      boxShadow: "none",
                    },
                  }}
                  onClick={() => navigate("create-post")}
                >
                  <AddBoxIcon sx={{ fontSize: 40 }} />
                </IconButton>
                <IconButton
                  sx={{
                    width: "100px",
                    "&:hover": {
                      backgroundColor: "inherit",
                      boxShadow: "none",
                    },
                  }}
                  onClick={() => navigate("profile")}
                >
                  <AccountBoxIcon sx={{ fontSize: 40 }} />
                </IconButton>
              </nav>
            </div>
          </Box>
        </Container>
      </Box>
    </>
  );
}
