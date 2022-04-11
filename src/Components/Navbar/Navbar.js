import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../Assets/Image/logo.png";
import "./Navbar.css";
import { useLocation } from "react-router-dom";
import useFirebase from "../Hooks/useFirebase";

const Navbar = () => {
  const { pathname } = useLocation();
  const { user, handleWithLogOut } = useFirebase();
  console.log(user);
  return (
    <nav style={pathname.includes("blog") ? { display: "none" } : { display: "flex" }}>
      <div className="logo-container">
        <img src={Logo} alt="" />
      </div>
      <div className="link-container">
        <NavLink className={({ isActive }) => (isActive ? "active-link" : "link")} to="/home">
          Home
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "active-link" : "link")} to="/videos">
          Videos
        </NavLink>
        {user && (
          <NavLink className={({ isActive }) => (isActive ? "active-link" : "link")} to="/services">
            Services
          </NavLink>
        )}
        {user?.uid ? (
          <span
            className={"link"}
            onClick={handleWithLogOut}
            style={{ marginLeft: "20px", cursor: "pointer" }}
          >
            LogOut
          </span>
        ) : (
          <NavLink className={({ isActive }) => (isActive ? "active-link" : "link")} to="/login">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
