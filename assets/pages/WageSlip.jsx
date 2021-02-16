import { Description } from "@material-ui/icons";
import React, { useState } from "react";
import AppPageTitle from "../components/AppPageTitle";
import FormModal from "../components/FormModalWage";
import Sidebar from "../components/Sidebar";

const WageSlip = () => {
  const title = "Fiche de paie";
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="admin_cte">
        <Sidebar history={history}></Sidebar>
        <div className="admin_panel_left">
          <AppPageTitle
            setOpen={setOpen}
            title={title}
            icon={<Description style={{ fill: "#fff" }} />}
          ></AppPageTitle>
          <FormModal title={title} setOpen={setOpen} open={open}></FormModal>
        </div>
      </div>
    </>
  );
};

export default WageSlip;
