import { Button } from "@material-ui/core";
import { Description, ExitToApp } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import Axios from "axios";
import React from "react";
import { useEffect } from "react";

import { useState } from "react";
import { REG_URL_API } from "../config";
import AuthApi from "../services/AuthApi";

const Sidebar = ({ history, onLogin }) => {
  const sidebar = React.useRef(null);
  const [userInfo, setUserInfo] = useState({ name: "", firstname: "" });

  const fetchUserInfo = async () => {
    try {
      Axios.get(REG_URL_API + "/" + window.localStorage.getItem("idUser"))
        .then((response) => response.data)
        .then((data) => {
          setUserInfo({
            ...userInfo,
            name: data.name,
            firstname: data.firstname,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  let handleClick = () => {
    sidebar.current.classList.toggle("top_sidebar_close");
  };
  let logout = () => {
    AuthApi.logout();
    console.log(onLogin);
    onLogin(false);
    history.push("/login");
  };
  return (
    <>
      <div ref={sidebar} id="sidebar_admin">
        <div className="top_sidebar">
          <MenuIcon
            onClick={() => handleClick()}
            fontSize="large"
            style={{ fill: "#fff" }}
          ></MenuIcon>
        </div>
        <div className="sidebar_ctn_name">
          <div className="img_member"></div>
          <span>
            {userInfo.firstname}
            &nbsp;
            {userInfo.name}
          </span>
        </div>
        <div className="sidebar_ctn_menu">
          <div className="row_sidebar">
            <Button style={{ color: "#fff" }} startIcon={<Description />}>
              Fiche de paie
            </Button>
            <Button
              style={{ color: "#fff" }}
              startIcon={<ExitToApp />}
              onClick={() => logout()}
            >
              Deconnexion
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
