import React from "react";
import { useDispatch, useSelector } from "react-redux";

//images
import Logo from "../../../assets/Logo.png";

import "./Navbar.css";

import { logout } from "../../../redux/actions/authAction";
import { useHistory } from "react-router";

const Navbar = ({ setIsSideOpen }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  //redux
  const {
    user: { role },
  } = useSelector((state) => state.auth);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <i
          className="lnr lnr-menu"
          onClick={() => setIsSideOpen((isSideOpen) => !isSideOpen)}
        ></i>
      </div>

      <img className="navbar__logo" src={Logo} alt="pensive-one" />
      <div className="navbar__right">
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="male-avatar"
          className="navbar__user__dp"
        />
        <span
          className="lnr lnr-exit"
          onClick={() => {
            dispatch(logout());
            history.push(role === "partner" ? "/login" : "/login/admin");
          }}
        ></span>
        {/* Settings */}
      </div>
    </div>
  );
};

export default Navbar;
