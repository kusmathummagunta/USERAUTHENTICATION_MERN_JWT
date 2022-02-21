//MERN = Mongo + Express + React + Node

//Development = Node.js server + React server

//Production = Node.js server + static react files

//once react is set using npx create-react-app client , cd client, npm start( we are deploying a development react server that holds babel, webpack etc for transpilation steps)
//Now we are left with MEN

//create an express server
const express = require("express");
const app = express();

//Setting up cors (we probably don't need cors during production but we need it for deploying)
//cors is one of the security measures the browser requires

const cors = require("cors");
// lets just say that this cors is the middleware, and middleware is the function that just manipulates the response
// and in most of the cases just passes it to the next function and what cors does internally is that it sets correct headers on the response so that
//chrome or browser  allows us to communicate with a cross origin(it is cross origin because of the different ports)

const mongoose = require("mongoose");
const User = require("./models/user");

app.use(cors());
//req.body wouldn't work if we don't use this. we get undefined
//we are letting the express know that we are using JSON to parse the body and populate the body.
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mern-application");

// app.get("/hello", (req, res) => {
//   res.send("hello client");
// });

//handler
app.post("/api/register", async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user);
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email/Mongo db error" });
  }
});
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    console.log("success");
    return res.json({ status: "success", user: true });
  } else {
    console.log("error");
    return res.json({ status: "error", user: false });
  }
});
//we need to start a server because nodemon runs the node file and exits cox there is no long running process
//and servers are long running process

app.listen(4000, () => {
  console.log("Server started on 4000");
});
