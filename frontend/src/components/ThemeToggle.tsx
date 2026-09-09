
interface ThemeToggleProps {
    darkMode: boolean;
    onToggle: () => void;
}

function ThemeToggle({
    darkMode,
    onToggle,
}: ThemeToggleProps) {

    return (
        <button
            className="theme-button"
            onClick={onToggle}
        >
            {darkMode
                ? "☀ Light Mode"
                : "☾ Night Mode"
            }
        </button>
    );
}

export default ThemeToggle;

