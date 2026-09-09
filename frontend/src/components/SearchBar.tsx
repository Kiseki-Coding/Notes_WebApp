interface SearchBarProps {
    search: string;
    onSearchChange: (value: string) => void;
}

function SearchBar({
    search,
    onSearchChange,
}: SearchBarProps) {

    return (
        <input
            className="search-input"
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(event) =>
                onSearchChange(event.target.value)
            }
        />
    );
}

export default SearchBar;
