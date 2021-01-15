import Axios from "axios";
import { REG_URL_API } from "../config";

let userInfo = () => {
  let user = { name: "", firstname: "" };
  Axios.get(REG_URL_API + "/" + window.localStorage.getItem("idUser"))
    .then((response) => response.data)
    .then((data) => {
      user.name = data.name;
      user.firstname = data.firstname;
    });
  return user;
};

export default {
  userInfo,
};
