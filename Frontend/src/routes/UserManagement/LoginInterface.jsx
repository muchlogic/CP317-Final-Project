import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";

export default function LoginInterface() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/users/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        // Successful login
        console.log("Success");
        setError("");
      } else {
        const errorReason = await response.json();
        if (errorReason.message === "Invalid Password") {
          setError("Password does not match associated email.");
        } else if (errorReason.message === "Invalid Username") {
          setError("Must be a username that exists in the database.");
        } else {
          setError("Unknown Error");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Unknown Error");
    }
  };
  return (
    <>
      <Container className="flex justify-center items-center h-[100vh]">
        <form onSubmit={handleLogin} className="space-y-4">
          <h1 className="text-3xl font-bold" style={{ marginBottom: "25px" }}>
            Login
          </h1>

          <div className="input-box space-y-4">
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="input-box">
              <TextField
                id="password"
                label="Password"
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
