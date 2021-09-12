import React, { useState } from "react";


import "./Sidebar.css";

import SidebarStrip from "./SidebarStrip/SidebarStrip";

const Sidebar = ({ isSideOpen, routes }) => {
  const [activeNum, setActiveNum] = useState(-1);

  return (
    <div className={`sidebar ${isSideOpen ? "" : "sidebar-closed"}`}>
      <SidebarStrip
        imgURL={"https://www.w3schools.com/howto/img_avatar.png"}
        isOnline
        isActive
      />

      {routes.map(
        ({ icon, title, path }, i) =>
          title && (
            <SidebarStrip
              icon={icon}
              title={title}
              to={path}
              key={i}
              isActive={activeNum === i}
              onClick={() => setActiveNum(i)}
            />
          )
      )}
    </div>
  );
};

export default Sidebar;
