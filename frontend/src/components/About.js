import React from "react";
import Navbar from "./Navbar";
import "../assets/styles/about.css";

const About = (props) => {
  const articles = [
    {
      icon: "fa-solid fa-lightbulb",
      title: "Capture Ideas Instantly",
      description:
        "Keep your thoughts and ideas in one place. With SkyWrite, jot down notes quickly and organize them effortlessly for easy access.",
    },
    {
      icon: "fa-solid fa-folder-open",
      title: "Effortless Organization",
      description:
        "Easily sort and categorize your notes with folders and tags. Find exactly what you need with powerful search options tailored for productivity.",
    },
    {
      icon: "fa-solid fa-edit",
      title: "Simple & Clean Interface",
      description:
        "Stay focused on your ideas with a distraction-free, intuitive design. SkyWrite's minimal interface makes note-taking easy and enjoyable.",
    },
    {
      icon: "fa-solid fa-lock",
      title: "Secure & Private",
      description:
        "Your notes are safe with us. SkyWrite ensures that your ideas remain private and accessible only to you.",
    },
    {
      icon: "fa-solid fa-cloud-upload-alt",
      title: "Easy Access Anytime",
      description:
        "Log in from any device to view your notes. SkyWrite keeps your content accessible, wherever you go.",
    },
    {
      icon: "fa-solid fa-gem",
      title: "Completely Free",
      description:
        "SkyWrite is designed to make note-taking simple and accessible, with no limits on usage and no hidden costs—enjoy complete freedom to organize.",
    },
  ];

  return (
    <div>
      <Navbar
        title="SkyWrite"
        showAlert={props.showAlert}
        token={props.token}
        setToken={props.setToken}
      />
      <div className="myOuterContainer p-top-8 pb-4 px-3">
        <div className="my-inner-container text-light text-center">
          <h2 className="mb-4 l-2">Powerful Features, Simple to Use</h2>
          <div className="row">
            {articles.map((article, index) => {
              return (
                <div
                  className="card col-md-4 card-bg-black px-2 py-3"
                  key={index}
                >
                  <i className={`${article.icon} i-icon`}></i>
                  <div className="card-body">
                    <h5 className="card-title l-1">{article.title}</h5>
                    <p className="card-text t-16 l-1">{article.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
