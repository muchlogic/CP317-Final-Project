import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";

export default function LoginInterface() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState("");

  const displayError = () => {
    // Login error validation

    setLoginError(true);
    setLoginErrorText("Invalid username or password");
  };

  const loginUser = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST", // Use POST for sending credentials
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Successful login
        const data = await response.json();
        if (data.user == null) displayError(); // Clear error on success
        console.log (data.user)
      }
    } catch (err) {
      console.error("", err);
    }
  };
  return (
    <>
      <Container className="flex justify-center items-center h-[100vh]">
        <form onSubmit={loginUser} className="space-y-4">
          <h1 className="text-3xl font-bold" style={{ marginBottom: "25px" }}>
            Login
          </h1>

          <div className="input-box space-y-4">
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              error={loginError}
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="input-box">
              <TextField
                id="password"
                label="Password"
                error={loginError}
                helperText={loginErrorText}
                variant="outlined"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: "50px" }}
            >
              Login
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
}
