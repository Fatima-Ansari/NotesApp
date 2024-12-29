import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteModal from "../components/NoteModal";
import NoteCard from "../components/NoteCard";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:4000/api/note", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (data.success) {
          setNotes(data.notes);
          setFilteredNotes(data.notes);
        } else {
          toast.error("Failed to fetch notes");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Unauthorized. Please login.");
          navigate("/login");
        } else {
          toast.error("Error fetching notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [navigate]);

  // Filter notes based on query
  useEffect(() => {
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  // Handle modal
  const openModal = (note = null) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentNote(null);
    setIsModalOpen(false);
  };

  // Delete note
  const deleteNote = async (id) => {
    const originalNotes = [...notes];
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    setFilteredNotes((prevFilteredNotes) =>
      prevFilteredNotes.filter((note) => note._id !== id)
    );

    try {
      const { data } = await axios.delete(`http://localhost:4000/api/note/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (data.success) {
        toast.success("Note deleted successfully");
      } else {
        throw new Error("Failed to delete note");
      }
    } catch (error) {
      setNotes(originalNotes); // Rollback on error
      toast.error("Error deleting note");
    }
  };

  // Add note
  const addNote = async (title, description) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/note/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data.success) {
        setNotes((prevNotes) => [...prevNotes, data.note]);
        closeModal();
        toast.success("Note added successfully");
      } else {
        toast.error("Failed to add note");
      }
    } catch (error) {
      toast.error("Error adding note");
    }
  };

  // Edit note
  const editNote = async (id, title, description) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data.success) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === id ? { ...note, title, description } : note
          )
        );
        closeModal();
        toast.success("Note updated successfully");
      } else {
        toast.error("Failed to edit note");
      }
    } catch (error) {
      toast.error("Error editing note");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} />
      <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading notes...</p>
        ) : filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={() => openModal(note)}
              onDelete={() => deleteNote(note._id)}
            />
          ))
        ) : (
          <p>No notes found</p>
        )}
      </div>
      <button
        onClick={() => openModal()}
        className="fixed bottom-4 right-4 bg-teal-500 text-white font-bold p-4 rounded-full"
      >
        Add Note
      </button>
      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          editNote={editNote}
          currentNote={currentNote}
        />
      )}
    </div>
  );
}

export default Home;

