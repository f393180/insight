/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  return (
    <useContext.AuthProvider value={[currentUser, setCurrentUser]}>
      {children}
    </useContext.AuthProvider>
  );
};

export default {
  useAuth,
  AuthProvider,
};
