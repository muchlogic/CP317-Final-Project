import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import {TextField, Button} from "@mui/material";
import {alignProperty} from "@mui/material/styles/cssUtils";


export default function LoginInterface() {
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [error, displayError] = useState("")

const loginUser = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch("http:localhost:3000/users/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({username, password }),

    })
    if (response.ok) {
      // Successful login
      console.log("Success");
      displayError("");
    } else {
      const errorReason = await response.json();
      if (errorReason.message === "Invalid Password") {
        displayError("Password does not match associated email.");
      } else if (errorReason.message === "Invalid Username") {
        displayError("Must be a username that exists in the database.");
      } else {
        displayError("Invalid");
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
    displayError("Invalid username or password");
  }
};
  return (

    <>
  <Container className="flex justify-center items-center h-[100vh]">
      <form onSubmit={loginUser} className="space-y-4">
        <h1 className="text-3xl font-bold"style={{marginBottom:"25px"}}>Login</h1>
       {error && <p className="text-red-500">{error}</p>}

        <div className="input-box space-y-4">
        <TextField 
        id="username" label="Username" variant="outlined" required value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
          <div className="input-box">
          <TextField id="password" label="Password" variant="outlined" type="password" required value={password}
          onChange={(e) => setPassword(e.target.value)}/>

          </div>
          <Button type="submit" variant="contained" style={{marginTop: "50px"}}>Login</Button>

        </div>
      </form>
      
      </Container>
    </>
  );
}
