import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./SidebarStrip.css";

const SidebarStrip = ({
  imgURL,
  icon,
  isOnline,
  title,
  isActive,
  to,
  onClick,
}) => {
  const history = useHistory();

  const [isNotif, setIsNotif] = useState(false);

  return (
    <div
      className={`sidebar__strip ${isActive ? "sidebar__strip__active" : ""}`}
      onClick={() => {
        history.push(to);
        onClick();
        setIsNotif(false);
      }}
    >
      <div className="sidebar__strip__icon">
        {!imgURL && isNotif && <div className="sidebar__strip__notif">1</div>}

        {imgURL && <img src={imgURL} alt="user-dp" />}
        {icon && <i className={icon} aria-hidden="true" />}
      </div>
      <div className="sidebar__strip__title">
        {isOnline && (
          <div className="d-flex">
            <div className="online"></div>
            Online
          </div>
        )}
        {title}
      </div>
    </div>
  );
};

export default SidebarStrip;
