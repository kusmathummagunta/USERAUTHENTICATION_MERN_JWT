import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  //we use usehistory hook from react router
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");

  async function populateQuote() {
    const req = await fetch("http://localhost:4000/api/dashboard", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();

    if (data.status === "ok") {
      setQuote(data.quote);
    } else {
      alert(data.error);
    }
  }
  //we need to verify if the user is logged in and so we use the useeffect hook
  useEffect(() => {
    const token = localStorage.getItem("token");
    // we get the token from local storage
    if (token) {
      const user = localStorage.getItem("user");
      console.log(user);

      //if user doesn't exist then it's kind of wrong
      if (!user) {
        localStorage.removeItem("token");
        Navigate("/login", { replace: true });
      } else {
        //if/ the user exists we need to send to the backend and populate the values
        populateQuote();
      }
    }
  }, []);

  async function Updatequote(event) {
    event.preventDefault();

    const req = await fetch("http://localhost:4000/api/dashboard", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        quote: tempQuote,
      }),
    });

    const data = await req.json();
    if (data.status === "ok") {
      setQuote(tempQuote);
      console.log(setQuote);
      setTempQuote("");
    } else {
      alert(data.error);
    }
  }
  return (
    <div align="center">
      <h1>Your quote: {quote || "NO Quote Found "}</h1>
      <form onSubmit={Updatequote}>
        <TextField
          sx={{ width: "60ch", height: "6ch" }}
          type="text"
          variant="outlined"
          label="Quote"
          value={tempQuote}
          onChange={(e) => setTempQuote(e.target.value)}
        />
        <Button
          sx={{ width: "30ch", mt: "0.4ch", ml: "0.5ch", height: "6ch" }}
          variant="outlined"
          type="submit"
        >
          Update quote
        </Button>
      </form>
    </div>
  );
};

export default Dashboard;
