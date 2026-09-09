
interface Note {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

interface NotelistProps {
    notes: Note[];
    selectedNote: Note | null;
    onSelectNote: (note: Note) => void;
}

function Notelist({
    notes,
    selectedNote,
    onSelectNote,
}: NotelistProps) {

    if (notes.length === 0) {
        return (
            <div className="notes-list">
                <p className="empty-notes">
                    No notes found.
                </p>
            </div>
        );
    }

    return (
        <div className="notes-list">

            {notes.map((note) => (

                <div
                    key={note.id}
                    className={
                        selectedNote?.id === note.id
                            ? "note-item selected"
                            : "note-item"
                    }
                    onClick={() =>
                        onSelectNote(note)
                    }
                >
                    {note.title || "Untitled"}
                </div>

            ))}

        </div>
    );
}

export default Notelist;
