import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../assets/styles/login.css";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const parsedData = await response.json();
    props.setToken(true);
    if (parsedData.success) {
      localStorage.setItem("token", parsedData.authToken);
      props.showAlert("success", "Successfully logged in!");
      navigate("/");
    } else {
      props.showAlert("danger", "Invalid Credentials");
      setCredentials({ email: "", password: "" });
    }
  };

  return (
    <div className="outer-container pt-15 pb-4 px-4">
      <div className="myContainer text-center">
        <div className="logo">
          <img
            className="mb-20"
            src={logo}
            alt="Error"
            width={50}
            height={50}
          />
          <h2 className="mb-20 text-light">Sign in</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={handleOnChange}
              placeholder="Email"
              value={credentials.email}
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
          <button type="submit" className="myBtn mb-4">
            Log in
          </button>
          <div className="divider mb-3">
            <span className="line"></span>
            <span className="text">or</span>
            <span className="line"></span>
          </div>
          <div
            className="text mb-3"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Don't have an account? <span className="myLink">Sign up</span>
          </div>
          <div 
            className="text"
            onClick={() => {
              navigate("/");
            }}
          >
            Want to go back? <span className='myLink'>Home</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
