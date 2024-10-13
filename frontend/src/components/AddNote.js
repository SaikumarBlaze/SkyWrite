import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
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
  };

  return (
    <div className="addNoteContainer text-center text-light">
      <h2 className="text-center">Add a Note</h2>
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
            id="exampleFormControlTextarea1"
            name="description"
            placeholder="Description: Enter your text here...."
            value={note.description}
            onChange={handleOnChange}
            rows="4"
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
        <button type="submit" className="addNoteBtn" onClick={handleSubmit}>
          Create Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
