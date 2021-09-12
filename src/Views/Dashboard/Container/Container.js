import React from "react";

import "./Container.css";

//Custom Components
import FormArea from "./FormArea/FormArea";
import Sidebar from "./Sidebar/Sidebar";

const Container = ({ isSideOpen }) => {
  return (
    <div className="container">
      <Sidebar isSideOpen={isSideOpen} />
      <FormArea />
    </div>
  );
};

export default Container;
