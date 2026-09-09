import SearchBar from "./SearchBar";
import Notelist from "./Notelist";

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

    onSearchChange: (value: string) => void;
    onSelectNote: (note: Note) => void;
    onCreateNote: () => void;
    onLogout: () => void;

    collapsed: boolean;
    onToggleCollapse: () => void;
}

function Sidebar({
    notes,
    selectedNote,
    search,
    onSearchChange,
    onSelectNote,
    onCreateNote,
    onLogout,
    collapsed,
    onToggleCollapse
}: SidebarProps) {

    return (
        <aside className={collapsed ? "sidebar collapsed" : "sidebar"}>

            <button
                className="collapse-button"
                onClick={onToggleCollapse}
                title={
                    collapsed
                        ? "Expand sidebar"
                        : "Collapse sidebar"
                }
            >
                {collapsed ? ">" : "<"}
            </button>

            <h1 className="sidebar-title">
                {collapsed ? "N" : "NOTES"}
            </h1>

            <SearchBar
                search={search}
                onSearchChange={onSearchChange}
            />

            <button
                className="new-note-button"
                onClick={onCreateNote}
                title="New Note"
            >
                {collapsed ? "+" : "+ New Note"}
            </button>

            <Notelist
                notes={notes}
                selectedNote={selectedNote}
                onSelectNote={onSelectNote}
            />

            <div className="sidebar-bottom">

                <button
                    className="logout-button"
                    onClick={onLogout}
                    title="Logout"
                >
                    {collapsed ? "↪" : "Logout"}
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;