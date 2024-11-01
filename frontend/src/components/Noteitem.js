import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new window.bootstrap.Tooltip(tooltipTriggerEl); // Initialize tooltip
    });
  }, []);

  const context = useContext(noteContext);
  const { deleteNote } = context;

  const { note, updateNote, showAlert } = props;
  const handleEditNote = () => {
    updateNote(note);
  };

  const handleDeleteNote = () => {
    deleteNote(note._id);
    showAlert("success", "Deleted Note Successfully!");
  };

  return (
    <div
      className="card my-3 text-white"
      style={{ border: "1px solid rgba(127, 127, 127, 0.5)" }}
    >
      <div className="card-body l-1">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="card-title m-0">{note.title}</h5>
          <div className="d-flex">
            <i
              className="fa-regular fa-pen-to-square me-2"
              data-bs-toggle="tooltip"
              data-bs-custom-class="custom-tooltip"
              data-bs-placement="top"
              data-bs-title="Edit Note"
              onClick={handleEditNote}
            ></i>
            <i
              className="fa-regular fa-trash-can ms-2"
              data-bs-toggle="tooltip"
              data-bs-custom-class="custom-tooltip"
              data-bs-placement="top"
              data-bs-title="Delete Note"
              onClick={handleDeleteNote}
            ></i>
          </div>
        </div>
        <p className="card-text">{note.description}</p>
        <p className="card-text text-secondary">{note.tag}</p>
      </div>
    </div>
  );
};

export default Noteitem;
