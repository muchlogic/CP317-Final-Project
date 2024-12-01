import { Container } from "@mui/material";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SingUpInterface() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signUpError, setSignUpError] = useState(false);
  const [signUpErrorText, setSignUpErrorText] = useState("");
  const navigate = useNavigate()

  const displayError = () => {
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // format for emails
    const passwordReg = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // 8+ characters, 1 uppercase letter, 1 number

    if (!passwordReg.test(password)) {
      setSignUpError(true)
      setSignUpErrorText(
        "Invalid Password: Must be at least 8 characters long, contain 1 uppercase letter, and 1 number"
      );
      return false;
    }
    if (!emailReg.test(email)) {
      setSignUpError(true)
      setSignUpErrorText("Invalid Email: Must follow the format xxx@yyy.com");
      return false;
    }
    if (!username.trim()) {
      setSignUpError(true)
      setSignUpErrorText("Invalid Username: Username cannot be empty");
      return false;
    }
    setSignUpError(true);
    setSignUpError("");
    return true;
  };



  const signUpUser = async (event) => {
    event.preventDefault();

    if (!displayError()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/user/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      
      });

      if (response.ok) {
        const data = await response.json();
        navigate ("/login")
      }
    } catch (error) {
      console.error("", error);
    }
  };

  return (
    <>
      <Container className="flex justify-center items-center h-[100vh]">
        <form onSubmit={signUpUser} className="space-y-4">
          <h1 className="text-3xl font-bold" style={{ marginBottom: "25px" }}>
            Sign Up
          </h1>

          <div className="input-box">
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              error={signUpError}
              sx={{width: "300px"}}

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
              error={signUpError}
              sx={{width: "300px"}}

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
                error={signUpError}
                helperText={signUpErrorText}
                sx={{width: "300px"}}
                
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
