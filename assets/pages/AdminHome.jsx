import React from "react";
import Sidebar from "../components/Sidebar";

const AdminHome = ({  onLogin, history }) => {
  return (
    <>
      <div className="admin_cte">
        <Sidebar onLogin={onLogin} history={history}></Sidebar>
      </div>
    </>
  );
};

export default AdminHome;
