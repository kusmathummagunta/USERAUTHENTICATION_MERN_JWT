import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div align="center">
        <h1 align="center">Home Page</h1>
        <h2>
          <Link to="/register">Register</Link>
        </h2>
        <h2>
          <Link to="/login">Login</Link>
        </h2>
      </div>
    );
  }
}
