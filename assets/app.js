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

AuthApi.setup();
const App = () => {
  const [authenticated, setAuthenticated] = useState(AuthApi.isAuthenticated());

  const PrivateRoute = ({
    component: Component,
    path,
    isAuthenticated,
    onLogin,
  }) => (
    <Route
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} path={path} onLogin={onLogin} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          {authenticated ? <Redirect to="/AdminHome" /> : <Login />}
        </Route>
        <PrivateRoute
          path="/adminHome"
          component={AdminHome}
          onLogin={setAuthenticated}
        ></PrivateRoute>
        <PrivateRoute path="/wageslip" component={WageSlip}></PrivateRoute>
        <Route path="/register" component={Register}></Route>
        <Route
          path="/login"
          render={(props) => <Login onLogin={setAuthenticated} {...props} />}
        ></Route>
      </Switch>
      <ToastContainer position={toast.POSITION.TOP_LEFT} />
    </HashRouter>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
export default App;
