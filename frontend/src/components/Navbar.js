import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../assets/styles/navbar.css";

const Navbar = (props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    props.setToken(false);
    navigate("/");
    props.showAlert("success", "Successfully logged out!");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-bg-black sticky-top p-12">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Logo"
            width="25"
            height="25"
            className="d-inline-block align-text-top me-2"
          />
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
              <NavLink className="nav-link" aria-current="page" to="/">
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
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <span className="btn-active">Log in</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <span className="btn-active">Sign up</span>
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav mb-lg-0">
              <button
                className="nav-link text-start"
                type="button"
                onClick={handleLogout}
              >
                <span className="btn-active">Log out</span>
              </button>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
