import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "./components/Menu";
import TopBar from "./components/TopBar";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import LoginForm from "./pages/LoginForm";
import Register from "./pages/Register";
import RegisterForm from "./pages/RegisterForm";
import AuthApi from "./services/AuthApi";
import "./styles/app.css";

AuthApi.setup();
const App = () => {
  const [authenticated, setAuthenticated] = useState(AuthApi.isAuthenticated());

  return (
    <HashRouter>
      <TopBar />
      <Menu />
      <Switch>
        <Route
          path="/home"
          render={(props) => (
            <HomePage
              authenticated={authenticated}
              onLogin={setAuthenticated}
              {...props}
            />
          )}
        ></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/registerform" component={RegisterForm}></Route>
        <Route
          path="/loginform"
          render={(props) => (
            <LoginForm onLogin={setAuthenticated} {...props} />
          )}
        ></Route>
      </Switch>
      <ToastContainer position={toast.POSITION.TOP_LEFT} />
    </HashRouter>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
export default App;
