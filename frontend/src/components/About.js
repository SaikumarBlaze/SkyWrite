import React from "react";
import Navbar from "./Navbar";
import "../assets/styles/about.css";

const About = (props) => {
  const articles = [
    {
      icon: "fa-solid fa-sync-alt",
      title: "Access Anywhere",
      description:
        'Your notes are synced across all your devices—whether it\'s your phone, tablet, or computer. No need to press a "sync" button — everything updates in real time.',
    },
    {
      icon: "fa-solid fa-tags",
      title: "Organize Your Ideas",
      description:
        "Effortlessly manage your notes with tags and folders. Instantly find what you need with SkyWrite’s powerful search capabilities.",
    },
    {
      icon: "fa-solid fa-users",
      title: "Easily Share Ideas",
      description:
        "Share your notes, tasks, or ideas with others. Work together seamlessly by collaborating on shared notes or lists.",
    },
    {
      icon: "fa-solid fa-history",
      title: "Stay Updated",
      description:
        "Every update you make is saved, so you can always go back and see previous versions of your notes. Never lose important details.",
    },
    {
      icon: "fa-solid fa-file-code",
      title: "Write Your Way",
      description:
        "Whether you prefer plain text or formatting with Markdown, SkyWrite has you covered. Preview and publish your notes in your favorite format.",
    },
    {
      icon: "fa-solid fa-gift",
      title: "Free for You",
      description:
        "Enjoy unlimited notes, seamless syncing, collaboration, and more—completely free of charge. SkyWrite makes it easy to stay organized without the cost.",
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
          <h2 className="mb-4">Powerful Features, Simple to Use</h2>
          <div className="row">
            {articles.map((article, index) => {
              return (
                <div
                  className="card col-md-4 card-bg-black px-2 py-3"
                  key={index}
                >
                  <i className={`${article.icon} i-icon`}></i>
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text t-16">{article.description}</p>
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
