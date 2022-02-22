import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function App() {
  //creating the variables we need as state variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();

  //first point where our frontend connects with our backend
  async function registerUser(event) {
    //we do this because form have a default behaviour of refreshing/redirecting the page on submit
    event.preventDefault();

    //wait for response and this line will fail ro fetch if we dont have a method
    const response = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      //We also have to tell the backend that we are sending this as content type application/json. This is necessary because there are
      //buch of different ways of content-types. we can send as binary data or url encoded but the simplest is JSON
      headers: {
        "Content-Type": "application/json",
      },
      // we are sending this to the back end
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    // we convert the response data ino JSON
    const data = await response.json();

    console.log(data);

    if (data.status === "ok") {
      history("/login");
    }
  }
  return (
    <div align="center">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <TextField
          sx={{ width: "50ch" }}
          label="Name"
          variant="outlined"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <TextField
          sx={{ width: "50ch" }}
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <br />
        <br />
        <TextField
          sx={{ width: "50ch" }}
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <br />
        <br />
        <Button
          sx={{ width: "30ch", height: "6ch" }}
          variant="outlined"
          type="submit"
        >
          Register
        </Button>
      </form>
      <h3>
        Already have an account? <Link to="/login">Login</Link>{" "}
      </h3>
    </div>
  );
}

export default App;
