import { Button, TextField } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import React from "react";
import SearchFilter from "./SearchFilter";

const AppPageTitle = ({
  icon,
  title,
  setOpen,
  wages,
  setWages,
  filterWages,
  setFilterWages,
}) => {
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="app_page_title">
        <div className="app_page_left">
          <div className="cube_logo">{icon}</div>
          <h3>Liste {title}</h3>
        </div>
        <div className="app_page_right">
          <SearchFilter
            setWages={setWages}
            wages={wages}
            setFilterWages={setFilterWages}
            filterWages={filterWages}
          />
          <Button
            onClick={handleOpen}
            startIcon={<AddCircleOutline />}
            variant="contained"
          >
            Ajouter {title}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AppPageTitle;
