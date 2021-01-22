import React from "react";
import Sidebar from "../components/Sidebar";

const AdminHome = ({ history }) => {
  return (
    <>
      <div className="admin_cte">
        <Sidebar history={history}></Sidebar>
      </div>
    </>
  );
};

export default AdminHome;
