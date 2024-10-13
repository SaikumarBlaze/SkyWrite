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
    event.preventDefault();

    // Frontend validation to match backend rules
    if (note.title.trim().length < 3) {
      props.showAlert("danger", "Title must be at least 3 characters long.");
      setNote({ ...note, title: "" });
      return;
    }

    if (note.description.trim().length < 5) {
      props.showAlert(
        "danger",
        "Description must be at least 5 characters long."
      );
      setNote({ ...note, description: "" });
      return;
    }

    addNote(note.title, note.description, note.tag);
    props.showAlert("success", "Added Note Successfully!");
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