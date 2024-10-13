import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import Navbar from "./Navbar";
import "../assets/styles/notes.css";

const Notes = (props) => {
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
    if (localStorage.getItem("token")) getAllNotes();
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      eid: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleOnChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  const handleUpdateNote = (event) => {
    // Frontend validation to match backend rules
    if (note.etitle.trim().length < 3) {
      props.showAlert("danger", "Title must be at least 3 characters long.");
      return;
    }

    if (note.edescription.trim().length < 5) {
      props.showAlert(
        "danger",
        "Description must be at least 5 characters long."
      );
      return;
    }

    editNote(note.eid, note.etitle, note.edescription, note.etag);
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
                    id="exampleFormControlTextarea1"
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

      <div className="my-notes-outer-container pt-10 pb-4 px-3">
        <AddNote showAlert={props.showAlert} />

        <div className="container mt-50 text-light">
          <h2 className="text-center">Your Notes</h2>
          {notes.length === 0 && <div>No Notes to Display!</div>}
          <div className="row">
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
        </div>
      </div>
    </>
  );
};

export default Notes;
