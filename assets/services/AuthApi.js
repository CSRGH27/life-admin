import Axios from "axios";
import jwtDecode from "jwt-decode";
import { LOG_URL_API } from "../config";

function logout() {
  window.localStorage.removeItem("authToken");
  delete Axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
  return Axios.post(LOG_URL_API, credentials)
    .then((response) => response.data.token)
    .then((token) => {
      window.localStorage.setItem("authToken", token);
      setAxiosToken(token);
    });
}

function setAxiosToken(token) {
  Axios.defaults.headers["authorization"] = "Bearer " + token;
}

/**
 * MIse en place du token au chargement de l'app
 */
function setup() {
  const token = window.localStorage.getItem("authToken");
  if (token) {
    /**
     * Voir decomposition object /// on cree un object avec jwtDeoode(token) on cree la variable expiration en lui affectant la propriete exp de lobject jwtDecode()
     * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Affecter_par_d%C3%A9composition#D%C3%A9composer_un_objet
     */
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token);
    }
  }
}

/**
 * Permet de savoir si on est authentifié ou pas
 * @returns boolean
 */
function isAuthenticated() {
  // 1. Voir si on a un token ?
  const token = window.localStorage.getItem("authToken");
  // 2. Si le token est encore valide
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }
  return false;
}

export default {
  authenticate,
  setup,
  isAuthenticated,
  logout,
};
