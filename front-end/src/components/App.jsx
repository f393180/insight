import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import LoginPage from "./LoginPage";

const App = () => (
  <>
    <Route path="/login" component={LoginPage} />
    <Route path="/home" exact component={HomePage} />
    <Route path="/about" component={AboutPage} />
  </>
);

export default App;
