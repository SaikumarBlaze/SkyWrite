import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import { useState, useEffect } from "react";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notes from "./components/Notes";
import VerifyEmail from "./components/VerifyEmail";
import ResetPassword from "./components/ResetPassword";
import ManageAccount from "./components/ManageAccount";
import AddNote from "./components/AddNote";
import ProtectedRoute from "./components/ProtectedRoute";
import keepBackendAlive from "./utils/keepAlive";

function App() {
  const [alert, setAlert] = useState(null);

  const [token, setToken] = useState(false);

  const showAlert = (type, message) => {
    setAlert({ type, message });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  useEffect(() => {
    const backendURL = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const intervalId = keepBackendAlive(backendURL);

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
                <ProtectedRoute>
                  <Notes
                    showAlert={showAlert}
                    token={token}
                    setToken={setToken}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/notes/addnote"
              element={
                <ProtectedRoute>
                  <AddNote showAlert={showAlert} />
                </ProtectedRoute>
              }
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
                <ProtectedRoute>
                  <ManageAccount
                    showAlert={showAlert}
                    token={token}
                    setToken={setToken}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
