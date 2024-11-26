import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ViewPostInterface from "./routes/SocialInteraction/ViewPostInterface";
import SingUpInterface from "./routes/UserManagement/SignUpInterface";
import LoginInterface from "./routes/UserManagement/LoginInterface";
import ProfileInterface from "./routes/UserManagement/ProfileInterface";
import EditProfileInterface from "./routes/UserManagement/EditProfileInterface";
import GlobalInterface from "./routes/GlobalInterface";
import PostCreationInterface from "./routes/ContentManagement/PostCreationInterface";

const theme = createTheme({
  typography: {
    fontSize: 16,
    fontFamily: "Wintry, Wintry, sans-serif",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalInterface />,
    children: [
      {
        path: "/sign-up",
        element: <SingUpInterface />,
      },
      {
        path: "/login",
        element: <LoginInterface />,
      },
      { path: "/create-post", element: <PostCreationInterface /> },
      {
        path: "/view-post",
        element: <ViewPostInterface />,
      },
      {
        path: "/profile",
        element: <ProfileInterface />,
      },
      {
        path: "/edit-profile",
        element: <EditProfileInterface />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
