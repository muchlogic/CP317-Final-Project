import { Container, Box, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function GlobalInterface() {
  return (
    <>
      <Box sx={{ bgcolor: "brown" }} className="bg-[.../public/background.jpg]">
        <Container
          maxWidth="md"
          sx={{
            position: "relative",
            minHeight: "100vh",
            bgcolor: "white",
          }}
          disableGutters
        >
          <Box sx={{ p: 2, minHeight: "92vh" }}>
            <Outlet />
          </Box>
          <Box
            sx={{
              position: "sticky",
              left: 0,
              bottom: 0,
              width: "100%",
              bgcolor: "white",
              borderTop: "1px solid #000000",
              zIndex: 10,
            }}
          >
            <div className="flex justify-center items-center h-[8vh]">
              <nav className="grid-cols-3 ">
                <IconButton sx={{ width: "100px" }}>
                  <HomeIcon sx={{ fontSize: 40 }} />
                </IconButton>
                <IconButton sx={{ width: "100px" }}>
                  <AddBoxIcon sx={{ fontSize: 40 }} />
                </IconButton>
                <IconButton sx={{ width: "100px" }}>
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
