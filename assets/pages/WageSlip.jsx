import { Description } from "@material-ui/icons";
import React, { useState } from "react";
import AppPageTitle from "../components/AppPageTitle";
import FormModal from "../components/FormModal";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const WageSlip = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="admin_cte">
        <Sidebar history={history}></Sidebar>
        <div className="admin_panel_left">
          <TopBar></TopBar>
          <AppPageTitle
            setOpen={setOpen}
            title="Wage slip"
            icon={<Description style={{ fill: "#fff" }} />}
          ></AppPageTitle>
          <FormModal setOpen={setOpen} open={open}></FormModal>
        </div>
      </div>
    </>
  );
};

export default WageSlip;
