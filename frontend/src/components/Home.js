import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../assets/styles/home.css";
import { useNavigate } from "react-router-dom";
import image from "../assets/images/design.png";

function Home(props) {
  const navigate = useNavigate();
  const sentences = [
    "SkyWrite is your go-to note-taking platform that combines simplicity with real-time updates, ensuring your thoughts are captured and organized instantly, without the hassle.",
    "Manage all your tasks alongside your notes, with SkyWrite keeping everything in sync across all your devices, so you stay on top of what matters — wherever you are.",
    "Easily share files and notes within SkyWrite, bringing all your important resources into one place for seamless access and collaboration.",
    "After switching to SkyWrite, I no longer worry about losing important notes or tasks. With real-time cloud syncing, everything is always safe and available on any device.",
    "SkyWrite is more than a note-taking app — it's an organizational hub that allows you to categorize, tag, and structure your notes in a way that works for you, all while staying synced across devices.",
    "Whether you're managing projects, collaborating with others, or organizing your life, SkyWrite offers unlimited possibilities to stay productive and organized, wherever you are.",
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
            <h1 className="mb-5">
              SkyWrite - Your All-in-One Note-Taking Solution
            </h1>
            <p className="text-18 mb-5">
              All your notes, synced on all your devices. Get Simplenote now for
              iOS, Android, Mac, Windows, Linux, or in your browser.
            </p>
            <button
              type="button"
              className="myHomeBtn mb-5"
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
          <p className="changing text-28 text-center text-light pt-4">
            {sentences[index]}
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
