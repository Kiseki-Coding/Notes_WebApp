import { useEffect, useState } from "react";
import api from "../api";

interface Note {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    archived: boolean;
}

function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
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

        getNotes();
    }, []);

    if (loading) {
        return <p>Loading notes...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Notes</h1>

            {notes.length === 0 ? (
                <p>No notes yet.</p>
            ) : (
                <div>
                    {notes.map((note) => (
                        <div key={note.id}>
                            <h2>{note.title}</h2>
                            <p>{note.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Notes;