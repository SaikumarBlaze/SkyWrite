import React, { useRef, useState, useEffect } from "react";
import "../assets/styles/profile.css";
import { NavLink, useNavigate } from "react-router-dom";

const Profile = (props) => {
  const [isShow, setIsShow] = useState(false);
  const boxRef = useRef(null);
  const circleRef = useRef(null); // Reference for .circle-1
  const handleToggle = () => {
    setIsShow((prev) => !prev); // Toggle visibility on .circle-1 click
  };

  const handleClickOutside = (event) => {
    if (
      boxRef.current &&
      !boxRef.current.contains(event.target) &&
      circleRef.current &&
      !circleRef.current.contains(event.target)
    ) {
      setIsShow(false); // Close the box if clicked outside of .box and .circle-1
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove authentication data to log the user out
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    props.setToken(false); // Update the token state to false
    navigate("/"); // Redirect to home page
    props.showAlert("success", "Successfully logged out!");
  };

  useEffect(() => {
    document.addEventListener("pointerdown", handleClickOutside); // Using pointerdown for cross-device compatibility
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="profile-lg l-1">
        <div
          className={isShow ? "circle-1 profile-active" : "circle-1"}
          ref={circleRef}
          onClick={handleToggle}
        >
          {localStorage.getItem("userName").charAt(0).toUpperCase()}
        </div>
        <div ref={boxRef} className={isShow ? "box show" : "box"}>
          <div className="header"></div>
          <div className="body">
            <div className="circle-2">
              {localStorage.getItem("userName").charAt(0).toUpperCase()}
            </div>
            <div className="name">{localStorage.getItem("userName")}</div>
            <div className="email">{localStorage.getItem("userEmail")}</div>
            <NavLink className="manage" to="/account/manage">
              <i className="fa-solid fa-user me-2"></i>
              <span>Manage your Account</span>
            </NavLink>
          </div>
          <div className="footer">
            <div
              className="add-account"
              onClick={() => {
                navigate("/notes");
              }}
            >
              <i className="fa-solid fa-user-plus me-2"></i>
              <span className="text-5">My Notes</span>
            </div>
            <div className="log-out" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket me-2"></i>
              <span className="text-5 t-1">Sign out</span>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-sm navbar-nav mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" to="/account/manage">
            Manage Your Account
          </NavLink>
        </li>
        <li className="nav-item signOut-btn">
          <div className="nav-link" onClick={handleLogout}>
            Sign out
          </div>
        </li>
      </div>
    </>
  );
};

export default Profile;
