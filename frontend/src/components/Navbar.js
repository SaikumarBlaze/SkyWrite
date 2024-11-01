import React from "react";
import { NavLink, Link } from "react-router-dom";
// import logo from "../assets/images/logo.png";
import Profile from "./Profile";
import "../assets/styles/navbar.css";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-bg-black sticky-top p-12" style={{minHeight: "65.6px"}}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i
            className="fa-solid fa-file-lines notes-icon me-2"
            style={{ marginBottom: "0", fontSize: "26px" }}
          ></i>
          {props.title}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                Why Skywrite
              </NavLink>
            </li>
            {localStorage.getItem("token") && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/notes">
                  My Notes
                </NavLink>
              </li>
            )}
          </ul>
          {!localStorage.getItem("token") ? (
            <ul className="navbar-nav mb-lg-0">
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  <span className="btn-active">Log in</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/signup" className="nav-link">
                  <span className="btn-active">Sign up</span>
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav mb-lg-0">
              <Profile
                token={props.token}
                setToken={props.setToken}
                showAlert={props.showAlert}
              />
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
