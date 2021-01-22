import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import AuthApi from "./services/AuthApi";
import "./styles/app.css";
import { ToastContainer, toast } from "react-toastify";
import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
import WageSlip from "./pages/WageSlip";
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

AuthApi.setup();
const App = () => {
  const [authenticated, setAuthenticated] = useState(AuthApi.isAuthenticated());

  /** Voici le context que l'on passe a tous les composants */
  const contextValue = {
    authenticated,
    setAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            {authenticated ? <Redirect to="/adminHome" /> : <Login />}
          </Route>
          <PrivateRoute path="/adminHome" component={AdminHome}></PrivateRoute>
          <PrivateRoute path="/wageslip" component={WageSlip}></PrivateRoute>
          <Route path="/register" component={Register}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
        <ToastContainer position={toast.POSITION.TOP_LEFT} />
      </HashRouter>
    </AuthContext.Provider>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
export default App;
