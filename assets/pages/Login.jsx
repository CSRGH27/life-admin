import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import "csshake/dist/csshake.min.css";
import $ from "jquery";
import { toast } from "react-toastify";
import AuthApi from "../services/AuthApi";
import { NavLink } from "react-router-dom";
import { KeyboardArrowLeft } from "@material-ui/icons";

const Login = ({ history, onLogin }) => {
  const shakeError = () => {
    $(".modal_register_form").addClass("shake-horizontal shake-constant");
    setTimeout(() => {
      $(".modal_register_form").removeClass("shake-horizontal shake-constant");
    }, 500);
  };

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthApi.authenticate(credentials);
      history.replace("/adminHome");
      onLogin(true);
      toast.success("Vous etes maintenant connecte ! 😎");
    } catch (error) {
      if (error.response) {
        toast.error(
          "Aucun compte trouve ou les informations ne correspondent pas ! 😵"
        );
        shakeError();
      }
    }
  };

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCredentials({ ...credentials, [name]: value });
  };
  return (
    <>
      <div className="ctn_form ctn_form_log">
        <div className="modal_form">
          <div className="header_form_modal">
            <h3>Connectez Vous</h3>
          </div>
          <div className="body_form_modal">
            <form action="" className="form_display">
              <TextField
                value={credentials.username}
                required
                onChange={handleChange}
                id="standard-required"
                label="Email"
                name="username"
                color="secondary"
              />
              <TextField
                value={credentials.password}
                id="standard-password-input"
                label="Mot de passe "
                onChange={handleChange}
                type="password"
                required
                name="password"
                color="secondary"
              />
              <div className="footer_form_modal">
                <NavLink to="/register">
                  <Button startIcon={<KeyboardArrowLeft />} color="primary">
                    Inscrivez vous
                  </Button>
                </NavLink>

                <Button
                  className="btn_form_register"
                  variant="contained"
                  color="secondary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Connexion
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
