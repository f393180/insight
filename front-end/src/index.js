/* eslint-disable react/jsx-filename-extension */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import ErrorBoundary from "./components/ErrorBoundary";

render(
  <ErrorBoundary>
    <Router>
      <App />
    </Router>
  </ErrorBoundary>,
  document.getElementById("root")
);
