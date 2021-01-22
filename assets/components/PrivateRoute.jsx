import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const PrivateRoute = ({ path, component }) => {
  const { authenticated } = useContext(AuthContext);

  return authenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login"></Redirect>
  );
};

export default PrivateRoute;
