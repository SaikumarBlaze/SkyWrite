import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import { useState } from "react";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notes from "./components/Notes";
import VerifyEmail from "./components/VerifyEmail";
import ResetPassword from "./components/ResetPassword";
import ManageAccount from "./components/ManageAccount";
import AddNote from "./components/AddNote";

function App() {
  const [alert, setAlert] = useState(null);

  const [token, setToken] = useState(false);

  const showAlert = (type, message) => {
    setAlert({ type, message });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Alert alert={alert} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home showAlert={showAlert} token={token} setToken={setToken} />
              }
            />
            <Route
              exact
              path="/about"
              element={
                <About
                  showAlert={showAlert}
                  token={token}
                  setToken={setToken}
                />
              }
            />
            <Route
              exact
              path="/notes"
              element={
                <Notes
                  showAlert={showAlert}
                  token={token}
                  setToken={setToken}
                />
              }
            />
            <Route
              exact
              path="/notes/addnote"
              element={<AddNote showAlert={showAlert} />}
            />
            <Route
              exact
              path="/login"
              element={
                <Login
                  showAlert={showAlert}
                  token={token}
                  setToken={setToken}
                />
              }
            />
            <Route
              exact
              path="/account/verify-email"
              element={<VerifyEmail showAlert={showAlert} />}
            />
            <Route
              exact
              path="/account/reset-password"
              element={
                <ResetPassword
                  showAlert={showAlert}
                  token={token}
                  setToken={setToken}
                />
              }
            />
            <Route
              exact
              path="/signup"
              element={
                <Signup
                  showAlert={showAlert}
                  token={token}
                  setToken={setToken}
                />
              }
            />
            <Route
              exact
              path="/account/manage"
              element={
                <ManageAccount
                  showAlert={showAlert}
                  token={token}
                  setToken={setToken}
                />
              }
            />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
