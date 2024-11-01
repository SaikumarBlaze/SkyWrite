import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/login.css";

const VerifyEmail = (props) => {
  const host = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    try {
      // Sending login credentials to the backend API
      const response = await fetch(`${host}/api/auth/account/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specifying JSON format in request body
        },
        body: JSON.stringify({ email }),
      });

      const parsedData = await response.json(); // Parse the response from the server

      // Verify if the email already registered based on backend response
      if (parsedData.success) {
        localStorage.setItem("userName", parsedData.name); // Store the user's name in local storage
        localStorage.setItem("userEmail", email); // Store the user's email in local storage
        // Show success alert and navigate to the home page
        props.showAlert("success", "Email Verified Successfully!");
        navigate("/account/reset-password", { state: { email } });
      } else {
        // Handle invalid credentials scenario
        props.showAlert("danger", "Email doesn't exists!");

        // Clear the input fields in case of failed login attempt
        setEmail("");
      }
    } catch (error) {
      // Catch any network or server errors and display a general error message
      console.error("Verification failed:", error.message);
      props.showAlert(
        "danger",
        "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <div className="outer-container p-3 d-flex flex-column justify-content-center align-items-center">
      <div className="verify-container text-light l-1">
        <h2 className="heading">Find your Account</h2>
        <p className="desc">
          Please enter your email address to search for your account.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="email-field">
            <input
              type="email"
              className="form-control font-18 p-2"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={handleOnChange}
              placeholder="Email Address"
              value={email}
              autoComplete="email"
              required
            />
          </div>
          <div className="verify-btns d-flex justify-content-end">
            <button
              type="button"
              className="cancel-btn me-2"
              onClick={() => {
                navigate("/login");
              }}
            >
              Cancel
            </button>
            <button type="submit" className="search-btn">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
