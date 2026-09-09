import { useEffect, useState } from "react";
import api from "../api";
import "../styles/Notes.css";
import { useAuth } from "../context/AuthContext";

import Sidebar from "../components/Sidebar";
import NoteEditor from "../components/NoteEditor";

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
                title: "",
                content: "",
            });

            const createdNote = response.data;

            setNotes((currentNotes) => [
                createdNote,
                ...currentNotes,
            ]);

            setSelectedNote(createdNote);
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

        localStorage.setItem(
            "darkMode",
            String(newMode)
        );
    };

    if (loading) {
        return <p>Loading notes...</p>;
    }

    const filteredNotes = notes.filter((note) =>
        note.title
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div
            className={
                darkMode
                    ? "notes-page dark"
                    : "notes-page"
            }
        >
            <Sidebar
                notes={filteredNotes}
                selectedNote={selectedNote}
                search={search}
                darkMode={darkMode}
                onSearchChange={setSearch}
                onSelectNote={setSelectedNote}
                onCreateNote={createNote}
                onToggleDarkMode={toggleDarkMode}
                onLogout={logout}
            />

            <main className="editor">
                <NoteEditor
                    note={selectedNote}
                    onChange={setSelectedNote}
                    onSave={saveNote}
                    onDelete={deleteNote}
                />
            </main>
        </div>
    );
}

export default Notes;

