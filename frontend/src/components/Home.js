import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../assets/styles/home.css";
import { useNavigate } from "react-router-dom";
import image from "../assets/images/design.png";

function Home(props) {
  const navigate = useNavigate();
  const sentences = [
    "Organize your ideas effortlessly with SkyWrite, your go-to platform for managing notes, tasks, and projects all in one place.",
    "Keep all your notes secure and accessible. SkyWrite makes it easy to capture, organize, and find everything you need in one seamless experience.",
    "Streamline your workflow with SkyWrite—where capturing ideas, managing tasks, and organizing projects is as simple as it gets.",
    "From quick notes to detailed lists, SkyWrite helps you stay organized and focused with a clean, user-friendly interface.",
    "Elevate your productivity with SkyWrite. Capture every idea, track your tasks, and stay organized effortlessly, all in one place.",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [sentences.length]);

  return (
    <>
      <Navbar
        title="SkyWrite"
        showAlert={props.showAlert}
        token={props.token}
        setToken={props.setToken}
      />
      <div className="my-outer-container pt-18 pb-4 px-4">
        <div className="myInnerContainer-1">
          <div className="d-flex flex-column align-items-center text-light text-center">
            <h1 className="mb-5 l-2">
              SkyWrite - Your All-in-One Note-Taking Solution
            </h1>
            <p className="text-18 mb-5 l-1">
              Unleash your thoughts, organize your world — SkyWrite brings clarity
              to your ideas.
            </p>
            <button
              type="button"
              className="myHomeBtn mb-5 l-1"
              onClick={() => {
                !localStorage.getItem("token")
                  ? navigate("/signup")
                  : navigate("/notes");
              }}
            >
              {!localStorage.getItem("token")
                ? "Get Started for Free"
                : "myNotes"}
            </button>
          </div>
        </div>
        <div className="myInnerContainer-2 my-5">
          <div className="design m-auto">
            <img className="img-1" src={image} alt="mobile-notepad-images" />
          </div>
        </div>
        <div className="myInnerContainer-3">
          <p className="changing text-28 text-center text-light pt-4 l-1">
            {sentences[index]}
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
