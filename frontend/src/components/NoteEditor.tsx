 import { useState } from "react";

interface Note {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

interface NoteEditorProps {
    note: Note | null;
    onChange: (note: Note | null) => void;
    onSave: () => void;
    onDelete: () => void;
}

function NoteEditor({
    note,
    onChange,
    onSave,
    onDelete,
}: NoteEditorProps) {

    const [isEditing, setIsEditing] = useState(false);

    if (!note) {
        return (
            <div className="no-note-selected">

                <h2>Select a note</h2>

                <p>
                    Choose a note from the sidebar
                    to start editing.
                </p>

            </div>
        );
    }

    const handleSave = async () => {
        await onSave();
        setIsEditing(false);
    };

    return (
        <div className="editor-container">

            {isEditing ? (
                <input
                    className="note-title"
                    type="text"
                    value={note.title}
                    onChange={(event) =>
                        onChange({
                            ...note,
                            title: event.target.value,
                        })
                    }
                />
            ) : (
                <h2 className="note-title-display">
                    {note.title || "Untitled"}
                </h2>
            )}

            {isEditing ? (
                <textarea
                    className="note-content"
                    value={note.content}
                    onChange={(event) =>
                        onChange({
                            ...note,
                            content: event.target.value,
                        })
                    }
                    placeholder="Start writing..."
                />
            ) : (
                <div className="note-content-display">
                    {note.content || "No content."}
                </div>
            )}

            <div className="editor-buttons">

                {!isEditing ? (
                    <button
                        className="edit-button"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                ) : (
                    <>
                        <button
                            className="save-button"
                            onClick={handleSave}
                        >
                            Save
                        </button>

                        <button
                            className="delete-button"
                            onClick={onDelete}
                        >
                            Delete
                        </button>
                    </>
                )}

            </div>

        </div>
    );
}

export default NoteEditor;

