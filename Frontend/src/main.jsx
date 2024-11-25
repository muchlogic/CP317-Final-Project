import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingUpInterface from "./routes/UserManagement/SignUpInterface";
import LoginInterface from "./routes/UserManagement/LoginInterface";
import ProfileInterface from "./routes/UserManagement/ProfileInterface";
import EditProfileInterface from "./routes/UserManagement/EditProfileInterface";

const router = createBrowserRouter([
  {
    path: "/sign-up",
    element: <SingUpInterface />,
    children: [
      // { path: "/", element: <HomeDefault /> },
      // { path: "/join", element: <Join /> },
      // { path: "/host", element: <Host /> },
    ],
  },
  {
    path: "/login",
    element: <LoginInterface />,
  },
  {
    path: "/profile",
    element: <ProfileInterface />,
  },
  {
    path: "/edit-self-profile",
    element: <EditProfileInterface />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
