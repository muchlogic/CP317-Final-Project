import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import {TextField, Button} from "@mui/material";
import {alignProperty} from "@mui/material/styles/cssUtils";

export default function SingUpInterface() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, displayError] = useState("")
  
  const userSignup = async (event) => {
    event.preventDefault();
  }
  return (
    <>
      <Container className="flex justify-center items-center h-[100vh]">
      <form onSubmit={userSignup} className="space-y-4">
        <h1 className="text-3xl font-bold"style={{marginBottom:"25px"}}>Sign up</h1>
       {error && <p className="text-red-500">{error}</p>}

        <div className="input space-y-4">
        <TextField 
        id="username" label="Username" variant="outlined" required value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        <div className ="input">
         <TextField 
        id="email" label="Email" variant="outlined" required value={email}
        onChange={(e) => setEmail(e.target.value)}
        
        />
        </div>
          <div className="input">
          <TextField id="password" label="Password" variant="outlined" type="password" required value={password}
          onChange={(e) => setPassword(e.target.value)}/>

          </div>
          <Button type="submit" variant="contained" style={{marginTop: "50px"}}>Sign Up</Button>

        </div>
      </form>
      
      </Container>
    </>
  );
}
