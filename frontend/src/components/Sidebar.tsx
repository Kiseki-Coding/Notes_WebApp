
import SearchBar from "./SearchBar";
import Notelist from "./Notelist";
import ThemeToggle from "./ThemeToggle";

interface Note {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

interface SidebarProps {
    notes: Note[];
    selectedNote: Note | null;
    search: string;
    darkMode: boolean;

    onSearchChange: (value: string) => void;
    onSelectNote: (note: Note) => void;
    onCreateNote: () => void;
    onToggleDarkMode: () => void;
    onLogout: () => void;
}

function Sidebar({
    notes,
    selectedNote,
    search,
    darkMode,
    onSearchChange,
    onSelectNote,
    onCreateNote,
    onToggleDarkMode,
    onLogout,
}: SidebarProps) {

    return (
        <aside className="sidebar">

            <h1 className="sidebar-title">
                NOTES
            </h1>

            <SearchBar
                search={search}
                onSearchChange={onSearchChange}
            />

            <button
                className="new-note-button"
                onClick={onCreateNote}
            >
                + New Note
            </button>

            <Notelist
                notes={notes}
                selectedNote={selectedNote}
                onSelectNote={onSelectNote}
            />

            <div className="sidebar-bottom">

                <ThemeToggle
                    darkMode={darkMode}
                    onToggle={onToggleDarkMode}
                />

                <button
                    className="logout-button"
                    onClick={onLogout}
                >
                    Logout
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;

