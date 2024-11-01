import React, { useState } from "react";
import "../assets/styles/manageaccount.css";
import { useNavigate } from "react-router-dom";

const ManageAccount = (props) => {
  const navigate = useNavigate();
  const host = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Local states for managing form inputs
  const oldEmail = localStorage.getItem("userEmail");
  const [credentials, setCredentials] = useState({
    name: localStorage.getItem("userName"),
    email: localStorage.getItem("userEmail"),
    password: "",
  });

  const validatePassword = (password) => {
    return (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  // Function to fetch user details from the backend
  // This will be called to load all user details and display them in the app
  const getUser = async () => {
    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"), // Authorization token for secured access
        },
      });

      // Check if the request was successful, throw an error otherwise
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const parsedData = await response.json();
      return parsedData.user;
    } catch (error) {
      console.error("Failed to fetch user details:", error.message);
    }
  };

  const handleOnChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  // Placeholder function for form submission
  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (!validatePassword(credentials.password)) {
      props.showAlert(
        "danger",
        "Invalid password. Must be at least 6 characters long, contain an uppercase letter, a number, and a special character."
      );
      setCredentials({ ...credentials, password: "" });
      return;
    }

    try {
      // Sending new credentials to the backend API
      const response = await fetch(`${host}/api/auth/account/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specifying JSON format in request body
        },
        body: JSON.stringify({
          name: credentials.name,
          oldEmail,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const parsedData = await response.json(); // Parse the response from the server

      // Check if the changes are saved successfully based on backend response
      if (parsedData.success) {
        localStorage.setItem("userName", credentials.name); // Update the user's name in local storage

        localStorage.setItem("userEmail", credentials.email); // Update the user's email in local storage

        // Show success alert and navigate to the home page
        props.showAlert("success", "Changes saved successfully!");

        setCredentials({ ...credentials, password: "" });
      } else {
        props.showAlert("danger", "Internal server error");
      }
    } catch (error) {
      // Catch any network or server errors and display a general error message
      console.error("Failed to save changes:", error.message);
      props.showAlert(
        "danger",
        "Something went wrong. Please try again later."
      );
    }
  };

  // Function to delete an user
  const handleDeleteAccount = async (id) => {
    try {
      const user = await getUser();
      id = user._id;
      const response = await fetch(`${host}/api/auth/deleteuser/${id}`, {
        method: "DELETE",
      });

      // Check if the request was successful, throw an error otherwise
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const parsedData = await response.json();
      if (parsedData.success) {
        // Remove authentication data
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");

        props.setToken(false); // Update the token state to false
        navigate("/"); // Redirect to home page
        props.showAlert("success", "Account deleted successfully!");
      } else {
        props.showAlert("danger", "Internal server error!");
      }
    } catch (error) {
      console.error("Failed to delete account:", error.message);
      props.showAlert("danger", "Failed to delete account!");
    }
  };

  return (
    <div className="outer-container-account">
      <div className="manage-account text-light l-1">
        <div className="back-btn" data-bs-theme="dark">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => {
              navigate("/");
            }}
          ></button>
        </div>

        <h2>Manage Your Account</h2>

        <section className="profile-section">
          <h3>Profile Information</h3>
          <form onSubmit={handleSaveChanges}>
            <div className="label mb-3">
              Name:
              <input
                type="text"
                id="name"
                name="name"
                value={credentials.name}
                onChange={handleOnChange}
                autoComplete="name"
                required
              />
            </div>
            <div className="label mb-3">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleOnChange}
                autoComplete="email"
                required
              />
            </div>
            <div className="label mb-3">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleOnChange}
                placeholder="New password"
                autoComplete="new-password"
              />
            </div>
            <button className="blue" type="submit">
              Save Changes
            </button>
          </form>
        </section>

        <section className="account-actions">
          <h3>Account Actions</h3>
          <button className="danger" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </section>
      </div>
    </div>
  );
};

export default ManageAccount;
