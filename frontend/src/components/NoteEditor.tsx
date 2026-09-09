import { useEffect, useRef, useState } from "react";

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

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    /*
        Resize the textarea so that all of its
        content is visible.

        This means the textarea itself does NOT
        need a scrollbar.

        The browser/page scrollbar will handle
        the scrolling instead.
    */
    const resizeTextarea = () => {
        const textarea = textareaRef.current;

        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    /*
        Resize the textarea when:

        - Edit mode starts
        - The note changes
        - The note content changes
    */
    useEffect(() => {
        if (isEditing) {
            resizeTextarea();
        }
    }, [isEditing, note?.content]);

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

    const handleContentChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {

        const textarea = event.target;

        /*
            Update the note content.
        */
        onChange({
            ...note,
            content: textarea.value,
        });

        /*
            Make the textarea grow with
            the amount of text inside it.
        */
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    return (
        <div className="editor-container">

            <div className="editor-toolbar">

                <div className="editor-actions">

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
                    placeholder="Untitled"
                />
            ) : (
                <h2 className="note-title-display">
                    {note.title || "Untitled"}
                </h2>
            )}

            {isEditing ? (
                <textarea
                    ref={textareaRef}
                    className="note-content"
                    value={note.content}
                    onChange={handleContentChange}
                    placeholder="Start writing..."
                />
            ) : (
                <div className="note-content-display">
                    {note.content || "No content."}
                </div>
            )}

        </div>
    );
}

export default NoteEditor;