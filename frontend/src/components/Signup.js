import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/login.css";

const Signup = (props) => {
  const host = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

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
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type for the request body
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const parsedData = await response.json();

      // If the registration is successful, save the token and update state
      if (parsedData.success) {
        localStorage.setItem("token", parsedData.authToken); // Store the authentication token in localStorage
        props.setToken(true); // Update the token state to true (user is logged in)
        localStorage.setItem("userName", credentials.name); // Store the user's name in local storage
        localStorage.setItem("userEmail", credentials.email); // Store the user's email in local storage
        props.showAlert("success", "Account created successfully!"); // Show a success message
        navigate("/"); // Redirect to the home page
      } else {
        // Handle different error messages from the backend
        if (parsedData.message === "Email already exists!") {
          props.showAlert("danger", "Account already exists!"); // Show an alert if the email is already registered
        } else {
          props.showAlert("danger", "Internal server error!"); // Generic error message for server issues
        }

        // Reset the form fields after an unsuccessful attempt
        setCredentials({
          name: "",
          email: "",
          password: "",
          cpassword: "",
        });
      }
    } catch (error) {
      // Catch and handle any network or unexpected errors
      console.error("Registration failed:", error.message);
      props.showAlert("danger", "An error occurred. Please try again later.");
    }
  };

  return (
    <div className="outer-container pt-10 pb-4 px-4">
      <div className="myContainer text-center l-1">
        <div className="logo">
          <i className="fa-solid fa-file-lines notes-icon"></i>
          <h2 className="mb-20 text-light l-2">Sign up</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              aria-describedby="emailHelp"
              onChange={handleOnChange}
              placeholder="Name"
              value={credentials.name}
              minLength={3}
              autoComplete="name"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={handleOnChange}
              placeholder="Email"
              value={credentials.email}
              autoComplete="email"
              required
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-4">
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
          <button type="submit" className="myBtn mb-4">
            Sign up
          </button>
          <div className="divider mb-3">
            <span className="line"></span>
            <span className="text">or</span>
            <span className="line"></span>
          </div>
          <div
            className="text mb-3"
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have an account? <span className="myLink">Log in</span>
          </div>
          <div
            className="text"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to homepage? <span className="myLink">Home</span>
          </div>
        </form>
      </div>
    </div>

    // <div className="container">
    //   <form onSubmit={handleSubmit}>
    //     </div>

    //     <button type="submit" className="btn btn-success">
    //       Signup
    //     </button>
    //   </form>
    // </div>
  );
};

export default Signup;
