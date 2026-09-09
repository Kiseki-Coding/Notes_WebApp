import { useEffect, useState } from "react";
import api from "../api";
import "../styles/Notes.css";
import { useAuth } from "../context/AuthContext";
interface Note {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

function Notes() {
    const { logout } = useAuth();
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [search, setSearch] = useState("");

    const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
    );
    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const response = await api.get("/notes");
            setNotes(response.data);
        } catch (error) {
            console.error("Failed to get notes:", error);
            setError("Failed to load notes.");
        } finally {
            setLoading(false);
        }
    };

    const createNote = async () => {
        try {
            const response = await api.post("/notes", {
                title: newTitle,
                content: newContent,
            });

            const createdNote = response.data;

            setNotes((currentNotes) => [
                createdNote,
                ...currentNotes,
            ]);

            setSelectedNote(createdNote);

            setNewTitle("");
            setNewContent("");
        } catch (error) {
            console.error("Failed to create note:", error);
            setError("Failed to create note.");
        }
    };
    const saveNote = async () => {
    if (!selectedNote) {
        return;
    }

    try {
        const response = await api.put(
            `/notes/${selectedNote.id}`,
            {
                title: selectedNote.title,
                content: selectedNote.content,
            }
        );

        const updatedNote = response.data;

        setSelectedNote(updatedNote);

        setNotes((currentNotes) =>
            currentNotes.map((note) =>
                note.id === updatedNote.id
                    ? updatedNote
                    : note
            )
        );

        console.log("Note saved successfully!");
    } catch (error) {
        console.error("Failed to save note:", error);
        setError("Failed to save note.");
    }
    };

    const deleteNote = async () => {
        if (!selectedNote) {
            return;
        }

        try {
            await api.delete(`/notes/${selectedNote.id}`);

            setNotes((currentNotes) =>
                currentNotes.filter(
                    (note) => note.id !== selectedNote.id
                )
            );

            setSelectedNote(null);

            console.log("Note deleted successfully!");
        } catch (error) {
            console.error("Failed to delete note:", error);
            setError("Failed to delete note.");
        }
    };
    const toggleDarkMode = () => {
    const newMode = !darkMode;

    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    };

    if (loading) {
        return <p>Loading notes...</p>;
    }
    const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
    );    
    return (
    <div className={darkMode ? "notes-page dark" : "notes-page"}>

        <aside className="sidebar">

            <h1 className="sidebar-title">
                NOTES
            </h1>

            <input
                className="search-input"
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(event) =>
                    setSearch(event.target.value)
                }
            />

            <button
                className="new-note-button"
                onClick={createNote}
            >
                + New Note
            </button>

            <div className="notes-list">
                {filteredNotes.length === 0 ? (
                    <p className="empty-notes">
                        No notes found.
                    </p>
                ) : (
                    filteredNotes.map((note) => (
                        <div
                            key={note.id}
                            className={
                                selectedNote?.id === note.id
                                    ? "note-item selected"
                                    : "note-item"
                            }
                            onClick={() =>
                                setSelectedNote(note)
                            }
                        >
                            {note.title || "Untitled"}
                        </div>
                    ))
                )}
            </div>

            <div className="sidebar-bottom">

                <button
                    className="theme-button"
                    onClick={toggleDarkMode}
                >
                    {darkMode ? "☀ Light Mode" : "☾ Night Mode"}
                </button>

                <button
                    className="logout-button"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </aside>

        <main className="editor">

            {selectedNote ? (
                <div className="editor-container">

                    <input
                        className="note-title"
                        type="text"
                        value={selectedNote.title}
                        onChange={(event) =>
                            setSelectedNote({
                                ...selectedNote,
                                title: event.target.value,
                            })
                        }
                    />

                    <textarea
                        className="note-content"
                        value={selectedNote.content}
                        onChange={(event) =>
                            setSelectedNote({
                                ...selectedNote,
                                content: event.target.value,
                            })
                        }
                        placeholder="Start writing..."
                    />

                    <div className="editor-buttons">

                        <button
                            className="save-button"
                            onClick={saveNote}
                        >
                            Save
                        </button>

                        <button
                            className="delete-button"
                            onClick={deleteNote}
                        >
                            Delete
                        </button>

                    </div>

                </div>
            ) : (
                <div className="no-note-selected">

                    <h2>Select a note</h2>

                    <p>
                        Choose a note from the sidebar
                        to start editing.
                    </p>

                </div>
            )}

        </main>

    </div>
    );
}

export default Notes;