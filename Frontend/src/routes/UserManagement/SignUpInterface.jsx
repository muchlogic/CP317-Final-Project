import { Container } from "@mui/material";
import { useState } from "react";
import { TextField, Button } from "@mui/material";

export default function SingUpInterface() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateInputs = () => {
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // format for emails
    const passwordReg = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // 8+ characters, 1 uppercase letter, 1 number

    if (!emailReg.test(email)) {
      setError("Invalid Email: Must follow the format xxx@yyy.com");
      return false;
    }

    if (!passwordReg.test(password)) {
      setError("Invalid Password: Must be at least 8 characters long, contain 1 uppercase letter, and 1 number");
      return false;
    }

    if (!username.trim()) {
      setError("Invalid Username: Username cannot be empty");
      return false;
    }

    return true;
  };

  const signUpUser = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const userData = {
      email,
      username,
      password,
    };

    try {
      const response = await fetch("http:localhost:3000/users/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Successful sign up", data);
        setError(""); // clear errors
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred during signup");
      }
    } catch (error) {
      setError("Unknown error");
      console.error("Signup error:", error);
    }
  };

  return (
    <>
      <Container className="flex justify-center items-center h-[100vh]">
        <form onSubmit={signUpUser} className="space-y-4">
          <h1 className="text-3xl font-bold" style={{ marginBottom: "25px" }}>
            Sign Up
          </h1>
          {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

          <div className="input-box">
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
              Sign up
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
}
