import { Button } from "@material-ui/core";
import { Description, ExitToApp } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import Axios from "axios";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { REG_URL_API } from "../config";
import AuthContext from "../contexts/AuthContext";
import AuthApi from "../services/AuthApi";

const Sidebar = ({ history }) => {
  const [userInfo, setUserInfo] = useState({ name: "", firstname: "" });
  const [open, setOpen] = useState(true);
  const sidebar = React.useRef(null);
  const { setAuthenticated } = useContext(AuthContext);

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
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  let handleClick = () => {
    sidebar.current.classList.toggle("top_sidebar_close");
    if (!open) {
      setTimeout(() => {
        setOpen(!open);
      }, 300);
    } else {
      setOpen(!open);
    }
  };
  let logout = () => {
    AuthApi.logout();
    setAuthenticated(false);
    history.push("/login");
  };
  return (
    <>
      <div ref={sidebar} id="sidebar_admin">
        <div className="top_sidebar">
          {open ? (
            <>
              <MenuIcon
                onClick={() => handleClick()}
                fontSize="large"
                style={{ fill: "#fff" }}
              ></MenuIcon>{" "}
              <h3>Life Admin</h3>
            </>
          ) : (
            <MenuIcon
              onClick={() => handleClick()}
              fontSize="large"
              style={{ fill: "#fff" }}
            ></MenuIcon>
          )}
        </div>
        <div className="sidebar_ctn_name">
          {open ? (
            <>
              <div className="img_member"></div>
              <span>
                {userInfo.firstname}
                &nbsp;
                {userInfo.name}
              </span>
            </>
          ) : (
            <div className="img_member"></div>
          )}
        </div>
        <span className="border_sidebar"></span>
        <div className={open ? "sidebar_ctn_menu" : "sidebar_ctn_menu_close"}>
          <div className="row_sidebar">
            {open ? (
              <Link to="/wageslip">
                <Button style={{ color: "#fff" }} startIcon={<Description />}>
                  Fiche de paie
                </Button>
              </Link>
            ) : (
              <Link to="/wageslip">
                <Description style={{ color: "#fff" }} fontSize="large" />
              </Link>
            )}
            {open ? (
              <Button
                style={{ color: "#fff" }}
                startIcon={<ExitToApp />}
                onClick={() => logout()}
              >
                Deconnexion
              </Button>
            ) : (
              <ExitToApp
                style={{ color: "#fff", cursor: "pointer" }}
                fontSize="large"
                onClick={() => logout()}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
