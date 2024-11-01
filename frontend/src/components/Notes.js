import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Navbar from "./Navbar";
import "../assets/styles/notes.css";
import plusIcon from "../assets/images/plus-icon.webp";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const [note, setNote] = useState({
    eid: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const { notes, getAllNotes, editNote } = context;
  const ref = useRef(null);

  useEffect(() => {
    // Check if there's a token in localStorage to determine if the user is logged in
    if (localStorage.getItem("token")) {
      getAllNotes(); // Fetch all notes if the user is authenticated
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to populate the note state with current note details for editing
  const updateNote = (currentNote) => {
    ref.current.click(); // Trigger the edit modal or form display
    setNote({
      eid: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  // Handle input changes dynamically by updating the note state
  const handleOnChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value }); // Update state based on the name of the input field
  };

  // Handle the update note form submission
  const handleUpdateNote = (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    // Frontend validation to match backend rules
    if (note.etitle.trim().length < 3) {
      props.showAlert("danger", "Title must be at least 3 characters long.");
      return; // Exit the function if validation fails
    }

    if (note.edescription.trim().length < 5) {
      props.showAlert(
        "danger",
        "Description must be at least 5 characters long."
      );
      return; // Exit the function if validation fails
    }

    // Call the editNote function to update the note in the backend
    editNote(note.eid, note.etitle, note.edescription, note.etag);

    // Show a success alert once the note is updated
    props.showAlert("success", "Edited Note Successfully!");
  };

  return (
    <>
      <Navbar
        title="SkyWrite"
        showAlert={props.showAlert}
        token={props.token}
        setToken={props.setToken}
      />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content modal-bg-black text-light px-2">
            <div className="modal-header" data-bs-theme="dark">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={handleOnChange}
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    placeholder="Description: Enter your text here...."
                    value={note.edescription}
                    onChange={handleOnChange}
                    rows="4"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={handleOnChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn editNoteBtn"
                data-bs-dismiss="modal"
                onClick={handleUpdateNote}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="my-notes-outer-container p-3">
        <div className="my-notes-inner-container text-light">
          {notes.length === 0 && (
            <div className="no-notes d-flex flex-column justify-content-center align-items-center">
              <i className="fa-solid fa-file-lines notes-icon"></i>
              <span className="no-notes-text l-2 mb-2">
                Notes you add appear here
              </span>
            </div>
          )}
          <div className="row mb-90">
            {notes.map((note, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <Noteitem
                    note={note}
                    updateNote={updateNote}
                    showAlert={props.showAlert}
                  />
                </div>
              );
            })}
          </div>
          <footer className="create-note">
            <img
              className="plus-icon"
              src={plusIcon}
              alt="Add Note"
              onClick={() => {
                navigate("/notes/addnote");
              }}
            />
          </footer>
        </div>
        <div className="bottom">
          <div className="empty-box"></div>
          <span className="bottom-text l-2 text-secondary">Click the plus icon to create a note</span>
        </div>
      </div>
    </>
  );
};

export default Notes;
