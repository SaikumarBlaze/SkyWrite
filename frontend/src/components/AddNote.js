import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";
import "../assets/styles/addnote.css";

const AddNote = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleOnChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Frontend validation: Ensure title is at least 3 characters long
    if (note.title.trim().length < 3) {
      // Show an alert if the title is too short
      props.showAlert("danger", "Title must be at least 3 characters long.");

      // Reset the title input and exit the function early
      setNote({ ...note, title: "" });
      return;
    }

    // Frontend validation: Ensure description is at least 5 characters long
    if (note.description.trim().length < 5) {
      // Show an alert if the description is too short
      props.showAlert(
        "danger",
        "Description must be at least 5 characters long."
      );

      // Reset the description input and exit the function early
      setNote({ ...note, description: "" });
      return;
    }

    // Add the new note using the provided title, description, and tag
    addNote(note.title, note.description, note.tag);

    // Show success message on successful note addition
    props.showAlert("success", "Added Note Successfully!");

    // Reset the note fields to empty for the next input
    setNote({ title: "", description: "", tag: "" });

    navigate("/notes");
  };

  return (
    <div className="add-note-container">
      <div className="add-note-inner-container text-light">
        <span
          className="left-arrow"
          onClick={() => {
            navigate("/notes");
          }}
        >
          &#8592;
        </span>
        <form>
          <div className="my-4">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={handleOnChange}
              placeholder="Title"
              value={note.title}
            />
          </div>
          <div className="mb-4">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea2"
              name="description"
              placeholder="Note"
              value={note.description}
              onChange={handleOnChange}
              rows="13"
            ></textarea>
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={handleOnChange}
              placeholder="Tag"
              value={note.tag}
            />
          </div>
          <div className="add-note-box">
            <button type="submit" className="addNoteBtn" onClick={handleSubmit}>
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
