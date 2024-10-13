import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // Backend API host URL
  const host = process.env.REACT_APP_API_URL || "http://localhost:5000"; 

  // Initial state for notes, starting with an empty array
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  // Function to fetch all notes from the backend
  // This will be called to load all user notes and display them in the app
  const getAllNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"), // Authorization token for secured access
        },
      });

      // Check if the request was successful, throw an error otherwise
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const parsedData = await response.json();
      setNotes(parsedData.notes);
    } catch (error) {
      console.error("Failed to fetch notes:", error.message);
    }
  };

  // Function to add a new note to the backend
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Inform backend of JSON content
          "auth-token": localStorage.getItem("token"), // Authorization token for secured access
        },
        body: JSON.stringify({ title, description, tag }), // Note data sent in request body
      });

      // Check if the request was successful, throw an error otherwise
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const parsedData = await response.json();
      setNotes(notes.concat(parsedData.notes));
    } catch (error) {
      console.error("Failed to add note:", error.message);
    }
  };

  // Function to edit an existing note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      // Check if the request was successful, throw an error otherwise
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      getAllNotes(); // Refresh the notes list after update
    } catch (error) {
      console.error("Failed to edit note:", error.message); // Log the error for debugging
    }
  };

  // Function to delete an existing note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      // Check if the request was successful, throw an error otherwise
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      // Filter out the deleted note from the existing notes state
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error.message);
    }
  };

  // Context provider wrapping the entire app component tree
  // Passes down notes and CRUD (Create, Read, Update, Delete) functions as context values
  return (
    <NoteContext.Provider
      value={{ notes, getAllNotes, addNote, editNote, deleteNote }}
    >
      {props.children}{" "}
      {/* Render children components wrapped by the provider */}
    </NoteContext.Provider>
  );
};

export default NoteState;
