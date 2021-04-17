import { Button, TextField } from "@material-ui/core";
import { KeyboardArrowLeft } from "@material-ui/icons";
import Axios from "axios";
import "csshake/dist/csshake.min.css";
import $ from "jquery";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { REG_URL_API } from "../config";

const Register = ({ history }) => {
  const shakeError = () => {
    $(".modal_form_register").addClass("shake-horizontal shake-constant");
    setTimeout(() => {
      $(".modal_form_register").removeClass("shake-horizontal shake-constant");
    }, 500);
  };
  console.log(history);
  const [credentials, setCredentials] = useState({
    email: "",
    firstname: "",
    name: "",
    birthdate: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    firstname: "",
    name: "",
    birthdate: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiErrors = {};

    if (credentials.password !== credentials.passwordConfirm) {
      setErrors({ passwordConfirm: "Vos mots de passe ne correspondent pas" });
      shakeError();
      return;
    } else if (credentials.birthdate === "") {
      setErrors({
        birthdate: "Vous n'avez pas renseigné votre date de naissance",
      });
      shakeError();
      return;
    }
    try {
      await Axios.post(REG_URL_API, credentials);
      history.replace("/login");
      toast.success("Vous etes desormais inscrit, vous puvez vous connecte !");
    } catch (error) {
      toast.error("Des erreurs dans votre formulaire ! 🙁");
      const { violations } = error.response.data;
      if (violations) {
        violations.forEach((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });

        setErrors(apiErrors);

        shakeError();
      }
    }
  };
  return (
    <div className="ctn_form ctn_form_reg">
      <div className="modal_form">
        <div className="header_form_modal">
          <h3>Créer votre compte</h3>
        </div>
        <div className="body_form_modal">
          <form onSubmit={handleSubmit}>
            {errors.email ? (
              <TextField
                error
                id="standard-error-helper-text"
                label="Erreur"
                value={credentials.username}
                onChange={handleChange}
                required
                helperText={errors.email}
                name="email"
                color="secondary"
              />
            ) : (
              <TextField
                value={credentials.username}
                required
                onChange={handleChange}
                id="standard-required"
                label="Email"
                name="email"
                color="secondary"
              />
            )}
            {errors.firstname ? (
              <TextField
                error
                helperText={errors.firstname}
                value={credentials.firstname}
                required
                onChange={handleChange}
                id="standard-required"
                label="Firstname"
                name="firstname"
                color="secondary"
              ></TextField>
            ) : (
              <TextField
                value={credentials.firstname}
                required
                onChange={handleChange}
                id="standard-required"
                label="Firstname"
                name="firstname"
                color="secondary"
              ></TextField>
            )}
            {errors.name ? (
              <TextField
                error
                helperText={errors.name}
                value={credentials.name}
                required
                onChange={handleChange}
                id="standard-required"
                label="Name"
                name="name"
                color="secondary"
              ></TextField>
            ) : (
              <TextField
                value={credentials.name}
                required
                onChange={handleChange}
                id="standard-required"
                label="Name"
                name="name"
                color="secondary"
              ></TextField>
            )}

            <TextField
              value={credentials.password}
              id="standard-password-input"
              label="Mot de passe "
              onChange={handleChange}
              required
              type="password"
              name="password"
              color="secondary"
            />
            <TextField
              id={
                errors.passwordConfirm
                  ? "standard-error-helper-text"
                  : "standard-password-input"
              }
              label="Repetez le mot de passe"
              type="password"
              required
              onChange={handleChange}
              name="passwordConfirm"
              color="secondary"
              helperText={
                errors.passwordConfirm
                  ? "Les mots de passes ne sont pas identiques"
                  : ""
              }
            />
            {errors.birthdate ? (
              <TextField
                error
                helperText={errors.birthdate}
                value={credentials.birthdate}
                onChange={handleChange}
                id="date"
                label="Birthday"
                className="input_birthday"
                type="date"
                format="DD-MM-YYYY"
                name="birthdate"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            ) : (
              <TextField
                value={credentials.birthdate}
                onChange={handleChange}
                id="date"
                label="Birthday"
                className="input_birthday"
                type="date"
                format="DD-MM-YYYY"
                name="birthdate"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
            <div className="footer_form_modal">
              <NavLink to="/login">
                <Button startIcon={<KeyboardArrowLeft />} color="primary">
                  Connectez vous
                </Button>
              </NavLink>

              <Button
                className="btn_form_register"
                variant="contained"
                color="secondary"
                type="submit"
              >
                Inscription
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
