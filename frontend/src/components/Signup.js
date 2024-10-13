import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../assets/styles/login.css";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
    const password = document.querySelector("input[name=password]");
    const confirm = document.querySelector("input[name=cpassword]");
    if (confirm.value === password.value) {
      confirm.setCustomValidity("");
    } else {
      confirm.setCustomValidity("Passwords do not match");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const parsedData = await response.json();
    props.setToken(true);
    if (parsedData.success) {
      localStorage.setItem("token", parsedData.authToken);
      props.showAlert("success", "Account created successfully!");
      navigate("/");
    } else {
      if (parsedData.message === "Email already exists!") {
        props.showAlert("danger", "Account already exists!");
      } else {
        props.showAlert("danger", "Internal server error!");
      }
      setCredentials({
        name: "",
        email: "",
        password: "",
        cpassword: "",
      });
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
          <h2 className="mb-20 text-light">Sign up</h2>
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
            Want to go back? <span className='myLink'>Home</span>
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
