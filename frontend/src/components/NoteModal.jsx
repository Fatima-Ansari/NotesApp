import React, { useEffect, useState } from "react";

const NoteModal = ({ closeModal, addNote, currentNote, editNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); // Error handling state

  // UseEffect to set fields when editing a note
  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    }
  }, [currentNote]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!title || !description) {
      setError("Both title and description are required.");
      return;
    }

    // If we are editing the note, call the editModel function
    if (currentNote) {
      editNote(currentNote._id, title, description);
    } else {
      // If it's a new note, call addNote function
      addNote(title, description);
    }

    setError(""); // Reset error if submission is successful
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded w-96">
        <h2 className="text-xl font-bold mb-4">
          {currentNote ? "Edit Note" : "Add New Note"}
        </h2>

        {/* Display error if fields are empty */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="border p-2 w-full mb-4"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            className="border p-2 w-full mb-4"></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            {currentNote ? "Update Note" : "Add Note"}
          </button>
        </form>

        {/* Cancel button to close the modal */}
        <button
          onClick={closeModal}
          className="mt-4 text-red-500 border border-red-500 rounded px-4 py-2">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NoteModal;
