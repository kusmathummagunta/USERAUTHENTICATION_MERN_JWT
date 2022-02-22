import { useState } from "react";
import { Button, TextField } from "@mui/material";

function App() {
  //creating the variables we need as state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //first point where our frontend connects with our backend
  async function loginUser(event) {
    //we do this because form have a default behaviour of refreshing/redirecting the page on submit
    event.preventDefault();

    //wait for response and this line will fail ro fetch if we dont have a method
    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      //We also have to tell the backend that we are sending this as content type application/json. This is necessary because there are
      //buch of different ways of content-types. we can send as binary data or url encoded but the simplest is JSON
      headers: {
        "Content-Type": "application/json",
      },
      // we are sending this to the back end
      body: JSON.stringify({
        email,
        password,
      }),
    });
    // we convert the response data ino JSON
    const data = await response.json();

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      window.location.href = "/dashboard";
    } else {
      alert("Please check your username and password");
    }

    //console.log(data);
  }
  return (
    <div align="center">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
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
          placeholder="Password"
        />
        <br />
        <br />
        <Button
          sx={{ width: "30ch", height: "6ch" }}
          variant="outlined"
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default App;
