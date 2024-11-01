import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/login.css";

const ResetPassword = (props) => {
  const host = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [credentials, setCredentials] = useState({
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // Retrieve email from location state

  const validatePassword = (password) => {
    return (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  // Handle input changes and password validation
  const handleOnChange = (event) => {
    // Update the credentials state dynamically as the user types
    setCredentials({ ...credentials, [event.target.name]: event.target.value });

    // Password and confirm password fields
    const password = document.querySelector("input[name=password]");
    const confirm = document.querySelector("input[name=cpassword]");

    // Check if both passwords match
    if (confirm.value === password.value) {
      // If they match, remove any custom validity error
      confirm.setCustomValidity("");
    } else {
      // If they don't match, set a custom error message
      confirm.setCustomValidity("Passwords do not match");
    }
  };

  // Handle form submission for user registration
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh on form submission

    if (!validatePassword(credentials.password)) {
      props.showAlert(
        "danger",
        "Invalid password. Must be at least 6 characters long, contain an uppercase letter, a number, and a special character."
      );
      return;
    }

    try {
      // Send a POST request to create a new user account
      const response = await fetch(`${host}/api/auth/account/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type for the request body
        },
        body: JSON.stringify({
          email,
          password: credentials.password,
        }),
      });

      const parsedData = await response.json();

      // If the registration is successful, save the token and update state
      if (parsedData.success) {
        localStorage.setItem("token", parsedData.authToken); // Store the authentication token in localStorage
        props.setToken(true); // Update the token state to true (user is logged in)
        props.showAlert("success", "Changed password successfully!"); // Show a success message
        navigate("/"); // Redirect to the home page
      } else {
        props.showAlert("danger", "Internal server error!"); // Generic error message for server issues

        // Reset the form fields after an unsuccessful attempt
        setCredentials({
          password: "",
          cpassword: "",
        });
      }
    } catch (error) {
      // Catch and handle any network or unexpected errors
      console.error("Password reset failed:", error.message);
      props.showAlert("danger", "An error occurred. Please try again later.");
    }
  };

  return (
    <div className="outer-container p-3 d-flex flex-column justify-content-center align-items-center">
      <div className="verify-container text-light l-1">
        <h2 className="heading">Reset Your Password</h2>
        <div className="profile-details d-flex flex-column align-items-center pt-4">
          <span className="pb-2">
            <i className="fa-solid fa-user f-24"></i>
          </span>
          <span>{email}</span>
          <span className="faded-text">Skywrite User</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-4 field">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleOnChange}
              placeholder="Password"
              value={credentials.password}
              minLength={6}
              required
            />
          </div>
          <div className="my-4 field">
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              onChange={handleOnChange}
              placeholder="Confirm Password"
              value={credentials.cpassword}
              minLength={6}
              required
            />
          </div>
          <div className="verify-btns d-flex justify-content-end bt">
            <button type="submit" className="search-btn">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
