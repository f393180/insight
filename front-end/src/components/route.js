import React from "react";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";

const routes = [
  {
    path: "/login",
    component: LoginPage,
    isPrivate: false,
  },
  {
    path: "/home",
    component: HomePage,
    isPrivate: true,
  },
];

export default routes;
