import { useState } from "react";
import "../styles/login.css";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
        await login(username, password);

        navigate("/notes");

    } catch (error) {
        console.error("Login failed:", error);
    }
    };
    if (isAuthenticated) {
    return <Navigate to="/notes" replace />;
    }
    return (
        <div className="login-page">

            <div className="login-box">

                <h1>Notes</h1>

                <p>Sign in to continue</p>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) =>
                        setUsername(event.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                />

                <button onClick={handleLogin}>
                    Login
                </button>

            </div>

        </div>
    );
}

export default Login;