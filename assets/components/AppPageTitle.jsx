import { Button } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import React from "react";
import { NavLink } from "react-router-dom";

const AppPageTitle = ({ icon, title, setOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="app_page_title">
        <div className="app_page_left">
          <div className="cube_logo">{icon}</div>
          <h3>List of {title}</h3>
        </div>
        <div className="app_page_right">
          <Button
            onClick={handleOpen}
            startIcon={<AddCircleOutline />}
            variant="contained"
          >
            Add {title}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AppPageTitle;
