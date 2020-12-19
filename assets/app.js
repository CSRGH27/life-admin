import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import AuthApi from "./services/AuthApi";
import "./styles/app.css";
import { ToastContainer, toast } from "react-toastify";

AuthApi.setup();
const App = () => {
  // const [authenticated, setAuthenticated] = useState(AuthApi.isAuthenticated());

  return (
    <HashRouter>
      <Switch>
        <Route path="/register" component={Register}></Route>
      </Switch>
      <ToastContainer position={toast.POSITION.TOP_LEFT} />
    </HashRouter>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
export default App;
